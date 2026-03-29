import React from 'react';

export const createIcon = (url: string) => {
  return function Icon({ size = 36, className = '' }: { size?: number, className?: string }) {
    return (
      <img 
        src={url} 
        width={size} 
        height={size} 
        className={className} 
        alt="app icon" 
        style={{ objectFit: 'contain' }}
        draggable={false}
      />
    );
  };
};

export const Icons = {
  chrome: createIcon('https://img.icons8.com/color/48/chrome--v1.png'),
  folder: createIcon('https://img.icons8.com/color/48/folder-invoices--v1.png'),
  portfolioSite: createIcon('https://img.icons8.com/fluency/48/domain.png'),
  resume: createIcon('https://img.icons8.com/fluency/48/resume.png'),
  projects: createIcon('https://img.icons8.com/fluency/48/group-of-projects.png'),
  vscode: createIcon('https://img.icons8.com/color/48/visual-studio-code-2019.png'),
  figma: createIcon('https://img.icons8.com/color/48/figma--v1.png'),
  linkedin: createIcon('https://img.icons8.com/color/48/linkedin.png'),
  likes: createIcon('https://img.icons8.com/fluency/48/like.png'),
  comments: createIcon('https://img.icons8.com/fluency/48/comments.png'),
  certificates: createIcon('https://img.icons8.com/fluency/48/certificate.png'),
  camera: createIcon('https://img.icons8.com/color/48/camera.png'),
  acknowledgments: createIcon('https://img.icons8.com/fluency/48/certificate.png'),
  trash: createIcon('https://img.icons8.com/fluency/48/trash.png'),
  terminal: createIcon('https://img.icons8.com/fluency/48/console.png'),
};
