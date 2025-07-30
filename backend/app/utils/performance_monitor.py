import time
import psutil
import asyncio
from typing import Dict, Any, List
from datetime import datetime, timedelta
from sqlalchemy import text
from app.core.database import AsyncSessionLocal
import logging

logger = logging.getLogger(__name__)

class PerformanceMonitor:
    """Advanced performance monitoring and metrics collection"""
    
    def __init__(self):
        self.metrics_cache = {}
        self.request_history = []
        self.alert_thresholds = {
            'response_time_p95': 500,  # ms
            'error_rate': 5,  # percentage
            'cpu_usage': 80,  # percentage
            'memory_usage': 85,  # percentage
            'database_connections': 50  # count
        }
    
    async def collect_system_metrics(self) -> Dict[str, Any]:
        """Collect comprehensive system performance metrics"""
        
        # CPU and Memory metrics
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        # Network metrics
        network = psutil.net_io_counters()
        
        # Process-specific metrics
        process = psutil.Process()
        process_memory = process.memory_info()
        process_cpu = process.cpu_percent()
        
        return {
            'timestamp': datetime.utcnow().isoformat(),
            'system': {
                'cpu_percent': cpu_percent,
                'memory_percent': memory.percent,
                'memory_available_gb': memory.available / (1024**3),
                'disk_percent': (disk.used / disk.total) * 100,
                'disk_free_gb': disk.free / (1024**3)
            },
            'network': {
                'bytes_sent': network.bytes_sent,
                'bytes_recv': network.bytes_recv,
                'packets_sent': network.packets_sent,
                'packets_recv': network.packets_recv
            },
            'process': {
                'memory_mb': process_memory.rss / (1024**2),
                'cpu_percent': process_cpu,
                'threads': process.num_threads(),
                'open_files': len(process.open_files())
            }
        }
    
    async def collect_database_metrics(self) -> Dict[str, Any]:
        """Collect database performance metrics"""
        try:
            async with AsyncSessionLocal() as session:
                # Connection count (for PostgreSQL)
                connection_query = text("""
                    SELECT count(*) as active_connections
                    FROM pg_stat_activity 
                    WHERE state = 'active'
                """) if "postgresql" in str(session.bind.url) else text("SELECT 1 as active_connections")
                
                # Table sizes and row counts
                contact_count = await session.execute(text("SELECT COUNT(*) FROM contact_submissions"))
                roi_count = await session.execute(text("SELECT COUNT(*) FROM roi_calculations"))
                
                # Performance metrics (PostgreSQL specific)
                if "postgresql" in str(session.bind.url):
                    slow_queries = await session.execute(text("""
                        SELECT count(*) as slow_query_count
                        FROM pg_stat_statements 
                        WHERE mean_time > 1000
                    """))
                    
                    cache_hit_ratio = await session.execute(text("""
                        SELECT round(
                            sum(blks_hit) * 100.0 / (sum(blks_hit) + sum(blks_read)), 2
                        ) as cache_hit_ratio
                        FROM pg_stat_database
                    """))
                else:
                    slow_queries = None
                    cache_hit_ratio = None
                
                return {
                    'timestamp': datetime.utcnow().isoformat(),
                    'connections': {
                        'active': connection_query.scalar() if connection_query else 1
                    },
                    'tables': {
                        'contact_submissions': contact_count.scalar(),
                        'roi_calculations': roi_count.scalar()
                    },
                    'performance': {
                        'slow_queries': slow_queries.scalar() if slow_queries else 0,
                        'cache_hit_ratio': cache_hit_ratio.scalar() if cache_hit_ratio else 100.0
                    }
                }
                
        except Exception as e:
            logger.error(f"Database metrics collection failed: {e}")
            return {
                'timestamp': datetime.utcnow().isoformat(),
                'error': str(e),
                'status': 'failed'
            }
    
    def record_request_metrics(self, endpoint: str, method: str, 
                             response_time: float, status_code: int):
        """Record individual request metrics"""
        
        metric = {
            'timestamp': datetime.utcnow(),
            'endpoint': endpoint,
            'method': method,
            'response_time_ms': response_time * 1000,
            'status_code': status_code,
            'is_error': status_code >= 400
        }
        
        self.request_history.append(metric)
        
        # Keep only last 1000 requests
        if len(self.request_history) > 1000:
            self.request_history = self.request_history[-1000:]
    
    def get_request_analytics(self, minutes: int = 60) -> Dict[str, Any]:
        """Analyze request patterns over specified time window"""
        
        cutoff_time = datetime.utcnow() - timedelta(minutes=minutes)
        recent_requests = [
            req for req in self.request_history 
            if req['timestamp'] > cutoff_time
        ]
        
        if not recent_requests:
            return {
                'period_minutes': minutes,
                'total_requests': 0,
                'error_rate': 0,
                'avg_response_time': 0
            }
        
        # Calculate metrics
        total_requests = len(recent_requests)
        error_count = sum(1 for req in recent_requests if req['is_error'])
        error_rate = (error_count / total_requests) * 100
        
        response_times = [req['response_time_ms'] for req in recent_requests]
        avg_response_time = sum(response_times) / len(response_times)
        
        # Percentiles
        sorted_times = sorted(response_times)
        p95_index = int(0.95 * len(sorted_times))
        p99_index = int(0.99 * len(sorted_times))
        
        # Endpoint breakdown
        endpoint_stats = {}
        for req in recent_requests:
            endpoint = req['endpoint']
            if endpoint not in endpoint_stats:
                endpoint_stats[endpoint] = {
                    'count': 0,
                    'errors': 0,
                    'total_time': 0
                }
            
            endpoint_stats[endpoint]['count'] += 1
            endpoint_stats[endpoint]['total_time'] += req['response_time_ms']
            if req['is_error']:
                endpoint_stats[endpoint]['errors'] += 1
        
        # Calculate averages for endpoints
        for endpoint, stats in endpoint_stats.items():
            stats['avg_response_time'] = stats['total_time'] / stats['count']
            stats['error_rate'] = (stats['errors'] / stats['count']) * 100
        
        return {
            'period_minutes': minutes,
            'total_requests': total_requests,
            'requests_per_minute': total_requests / minutes,
            'error_rate_percent': round(error_rate, 2),
            'response_times': {
                'average_ms': round(avg_response_time, 2),
                'p95_ms': round(sorted_times[p95_index], 2) if sorted_times else 0,
                'p99_ms': round(sorted_times[p99_index], 2) if sorted_times else 0,
                'min_ms': min(response_times),
                'max_ms': max(response_times)
            },
            'endpoints': endpoint_stats
        }
    
    def check_health_alerts(self, system_metrics: Dict, db_metrics: Dict, 
                          request_analytics: Dict) -> List[Dict[str, Any]]:
        """Check if any metrics exceed alert thresholds"""
        
        alerts = []
        
        # System alerts
        if system_metrics['system']['cpu_percent'] > self.alert_thresholds['cpu_usage']:
            alerts.append({
                'type': 'system',
                'severity': 'warning',
                'metric': 'cpu_usage',
                'current_value': system_metrics['system']['cpu_percent'],
                'threshold': self.alert_thresholds['cpu_usage'],
                'message': f"High CPU usage: {system_metrics['system']['cpu_percent']}%"
            })
        
        if system_metrics['system']['memory_percent'] > self.alert_thresholds['memory_usage']:
            alerts.append({
                'type': 'system',
                'severity': 'warning',
                'metric': 'memory_usage',
                'current_value': system_metrics['system']['memory_percent'],
                'threshold': self.alert_thresholds['memory_usage'],
                'message': f"High memory usage: {system_metrics['system']['memory_percent']}%"
            })
        
        # Request performance alerts
        if request_analytics['response_times']['p95_ms'] > self.alert_thresholds['response_time_p95']:
            alerts.append({
                'type': 'performance',
                'severity': 'warning',
                'metric': 'response_time_p95',
                'current_value': request_analytics['response_times']['p95_ms'],
                'threshold': self.alert_thresholds['response_time_p95'],
                'message': f"High response time P95: {request_analytics['response_times']['p95_ms']}ms"
            })
        
        if request_analytics['error_rate_percent'] > self.alert_thresholds['error_rate']:
            alerts.append({
                'type': 'application',
                'severity': 'critical',
                'metric': 'error_rate',
                'current_value': request_analytics['error_rate_percent'],
                'threshold': self.alert_thresholds['error_rate'],
                'message': f"High error rate: {request_analytics['error_rate_percent']}%"
            })
        
        return alerts
    
    async def generate_comprehensive_report(self) -> Dict[str, Any]:
        """Generate comprehensive performance report"""
        
        system_metrics = await self.collect_system_metrics()
        db_metrics = await self.collect_database_metrics()
        request_analytics = self.get_request_analytics(60)  # Last hour
        alerts = self.check_health_alerts(system_metrics, db_metrics, request_analytics)
        
        # Overall health score (0-100)
        health_score = 100
        if alerts:
            critical_alerts = [a for a in alerts if a['severity'] == 'critical']
            warning_alerts = [a for a in alerts if a['severity'] == 'warning']
            health_score -= len(critical_alerts) * 20 + len(warning_alerts) * 10
            health_score = max(0, health_score)
        
        return {
            'timestamp': datetime.utcnow().isoformat(),
            'health_score': health_score,
            'status': 'healthy' if health_score > 80 else 'degraded' if health_score > 50 else 'critical',
            'system_metrics': system_metrics,
            'database_metrics': db_metrics,
            'request_analytics': request_analytics,
            'alerts': alerts,
            'recommendations': self.generate_recommendations(alerts, system_metrics, request_analytics)
        }
    
    def generate_recommendations(self, alerts: List, system_metrics: Dict, 
                               request_analytics: Dict) -> List[str]:
        """Generate performance optimization recommendations"""
        
        recommendations = []
        
        # System recommendations
        if system_metrics['system']['cpu_percent'] > 70:
            recommendations.append("Consider scaling horizontally or optimizing CPU-intensive operations")
        
        if system_metrics['system']['memory_percent'] > 80:
            recommendations.append("Monitor memory usage and consider increasing available RAM")
        
        # Performance recommendations
        if request_analytics['response_times']['p95_ms'] > 300:
            recommendations.append("Optimize slow endpoints - consider database query optimization")
        
        if request_analytics['error_rate_percent'] > 2:
            recommendations.append("Investigate error patterns and improve error handling")
        
        if not recommendations:
            recommendations.append("System performance is optimal")
        
        return recommendations

# Global performance monitor instance
performance_monitor = PerformanceMonitor()