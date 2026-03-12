import React, { useState, useEffect } from 'react';
import { BsStar, BsGit, BsCodeSlash } from 'react-icons/bs';
import './GithubStats.css';

interface GithubStatsProps {
  repoUrl: string;
}

interface Stats {
  stars: number;
  forks: number;
  language: string;
}

const GithubStats: React.FC<GithubStatsProps> = ({ repoUrl }) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Extract owner/repo from URL
        const match = repoUrl.match(/github\.com\/([^/]+\/[^/]+)/);
        if (!match) return;

        const repoPath = match[1];
        const response = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          language: data.language
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [repoUrl]);

  if (loading || !stats) return <div className="github-stats-placeholder" />;

  return (
    <div className="github-stats-container">
      <div className="stat-item" title="Stars">
        {React.createElement(BsStar as any, { className: "stat-icon star" })}
        <span>{stats.stars}</span>
      </div>
      <div className="stat-item" title="Forks">
        {React.createElement(BsGit as any, { className: "stat-icon fork" })}
        <span>{stats.forks}</span>
      </div>
      {stats.language && (
        <div className="stat-item" title="Primary Language">
          {React.createElement(BsCodeSlash as any, { className: "stat-icon language" })}
          <span>{stats.language}</span>
        </div>
      )}
    </div>
  );
};

export default GithubStats;
