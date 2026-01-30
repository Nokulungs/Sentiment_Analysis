import { Upload, FileDown } from 'lucide-react';

interface FileUploadCardProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadCard = ({ onFileUpload }: FileUploadCardProps) => {
  return (
    <div className="xl:col-span-2 glass-panel p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center group border border-white h-full relative">
      <div className="w-20 h-20 bg-sentilux-pink-50 rounded-[2rem] flex items-center justify-center mb-6 border border-white group-hover:scale-105 transition-transform shadow-sm">
        <Upload size={36} className="text-sentilux-pink-300" />
      </div>
      <h3 className="text-xl font-black text-foreground">Dataset Upload</h3>
      <p className="text-sm text-muted-foreground mt-3 mb-8 px-4 leading-relaxed">
        Analyze multiple feedback entries at once using CSV or TXT files.
      </p>
      <div className="relative w-full px-4">
        <input 
          type="file" 
          accept=".txt,.csv" 
          onChange={onFileUpload} 
          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
        />
        <button className="w-full py-5 bg-sentilux-indigo-100 text-sentilux-indigo-900 font-black text-xs uppercase rounded-2xl border border-white shadow-sm flex items-center justify-center gap-3">
          <FileDown size={18} /> Choose File
        </button>
      </div>
    </div>
  );
};
