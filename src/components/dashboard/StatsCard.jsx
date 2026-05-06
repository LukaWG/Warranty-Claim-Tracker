import React from 'react';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon: Icon, color, delay = 0, onClick, isActive }) {
  const colorStyles = {
    blue: { background: '#222b57', shadow: 'rgba(34, 43, 87, 0.25)' },
    emerald: { background: '#56C4B7', shadow: 'rgba(86, 196, 183, 0.25)' },
    amber: { background: '#F59E0B', shadow: 'rgba(245, 158, 11, 0.25)' },
    purple: { background: '#8B5CF6', shadow: 'rgba(139, 92, 246, 0.25)' },
    red: { background: '#EF4444', shadow: 'rgba(239, 68, 68, 0.25)' },
    orange: { background: '#F97316', shadow: 'rgba(249, 115, 22, 0.25)' },
    teal: { background: '#14B8A6', shadow: 'rgba(20, 184, 166, 0.25)' },
    indigo: { background: '#6366F1', shadow: 'rgba(99, 102, 241, 0.25)' },
    cyan: { background: '#06B6D4', shadow: 'rgba(6, 182, 212, 0.25)' },
    pink: { background: '#EC4899', shadow: 'rgba(236, 72, 153, 0.25)' },
    slate: { background: '#64748B', shadow: 'rgba(100, 116, 139, 0.25)' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card 
        className={`border-0 shadow-lg bg-white overflow-hidden transition-all h-full ${onClick ? 'cursor-pointer hover:shadow-xl hover:scale-105' : ''} ${isActive ? 'ring-2 ring-offset-2' : ''}`}
        style={isActive ? { ringColor: colorStyles[color].background } : {}}
        onClick={onClick}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
              <p className="text-3xl font-bold text-slate-800">{value}</p>
            </div>
            <div 
              className="h-12 w-12 rounded-xl shadow-lg flex items-center justify-center"
              style={{ 
                background: colorStyles[color].background,
                boxShadow: `0 10px 15px -3px ${colorStyles[color].shadow}`
              }}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}