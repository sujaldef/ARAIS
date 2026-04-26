import React from 'react';
import { motion } from 'framer-motion';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

export default function AppShell({ children }) {
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[220px]">
        <Topbar />
        <main className="flex-1 overflow-y-auto mt-[52px] p-6 bg-bg-base">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
