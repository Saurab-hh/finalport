'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Volume2, BatteryMedium, Bluetooth, Plane, Moon, Sun, MonitorPlay, Settings, Edit3 } from 'lucide-react';
import { useState } from 'react';

export const QuickSettingsPanel = () => {
  const { quickSettingsOpen } = useStore();
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [nightLight, setNightLight] = useState(false);
  const [batterySaver, setBatterySaver] = useState(false);
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(100);

  return (
    <AnimatePresence>
      {quickSettingsOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-[60px] right-2 md:right-4 w-[360px] p-4 bg-white/70 dark:bg-[#1C1C1C]/90 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl z-[9999] flex flex-col gap-4 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="grid grid-cols-3 gap-2">
            <SettingsButton 
              icon={<Wifi size={18} />} 
              label="Wi-Fi" 
              active={wifiOn} 
              onClick={() => setWifiOn(!wifiOn)} 
              sub="Connected" 
            />
            <SettingsButton 
              icon={<Bluetooth size={18} />} 
              label="Bluetooth" 
              active={bluetoothOn} 
              onClick={() => setBluetoothOn(!bluetoothOn)} 
              sub={bluetoothOn ? 'On' : 'Off'}
            />
            <SettingsButton 
              icon={<Plane size={18} />} 
              label="Airplane mode" 
              active={airplaneMode} 
              onClick={() => setAirplaneMode(!airplaneMode)} 
            />
            <SettingsButton 
              icon={<Moon size={18} />} 
              label="Night light" 
              active={nightLight} 
              onClick={() => setNightLight(!nightLight)} 
            />
            <SettingsButton 
              icon={<BatteryMedium size={18} />} 
              label="Battery saver" 
              active={batterySaver} 
              onClick={() => setBatterySaver(!batterySaver)} 
            />
            <SettingsButton 
              icon={<MonitorPlay size={18} />} 
              label="Cast" 
              active={false} 
              onClick={() => {}} 
            />
          </div>

          <div className="flex flex-col gap-4 mt-2 mb-2 px-1">
            <div className="flex items-center gap-4 text-black dark:text-white">
              <Sun size={20} className="text-gray-600 dark:text-gray-400" />
              <input 
                type="range" 
                min="0" max="100" 
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <Volume2 size={20} className="text-gray-600 dark:text-gray-400" />
              <input 
                type="range" 
                min="0" max="100" 
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="border-t border-black/10 dark:border-white/10 pt-3 mt-1 flex justify-between items-center text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2 px-2 text-xs font-semibold">
              <BatteryMedium size={16} /> 68%
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition">
                <Edit3 size={16} />
              </button>
              <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition">
                <Settings size={16} />
              </button>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SettingsButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  sub?: string;
}

const SettingsButton = ({ icon, label, active, onClick, sub }: SettingsButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`relative w-full aspect-[2/1] rounded flex flex-col items-center justify-center border transition-all ${
        active 
          ? 'bg-blue-600 dark:bg-blue-600 border-blue-600 text-white' 
          : 'bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-white/10'
      }`}
    >
      {icon}
      <span className="text-[10px] mt-1 font-medium">{label}</span>
      {sub && <span className={`text-[9px] ${active ? 'text-blue-200' : 'text-gray-500'}`}>{sub}</span>}
    </button>
  );
};
