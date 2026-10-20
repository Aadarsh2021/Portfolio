import React from 'react';

export interface NetflixCardProps {
  item: any;
  category: 'project' | 'experience' | 'skill' | 'certification' | 'blog' | 'testimonial';
  rank?: number;
  onSelect: (item: any, category: string) => void;
}

const NetflixCard: React.FC<NetflixCardProps> = ({ item, category, rank, onSelect }) => {
  let title = '';
  let subtitle = '';
  let desc = '';
  let image = '';
  let badge = '';
  let badgeType: 'ruby' | 'cyan' | 'gold' | 'emerald' | 'violet' = 'ruby';
  let tags: string[] = [];
  let rating = 'Production';

  if (category === 'project') {
    title = item.title;
    subtitle = item.desc || 'Enterprise Full-Stack Architecture';
    desc = item.desc || '';
    image = item.img || '/assets/projects/clothez.png';
    badge = rank ? `#${rank} FEATURED` : 'SYSTEM';
    badgeType = 'ruby';
    tags = item.tags || [];
    rating = 'Live Production';
  } else if (category === 'experience') {
    title = item.role;
    subtitle = `${item.company} • ${item.period}`;
    desc = item.details || (item.highlights && item.highlights[0]) || '';
    tags = [item.type === 'education' ? 'Academic' : 'Enterprise', item.period];

    if (item.type === 'education' || (item.role && item.role.includes('IIT'))) {
      image = '/assets/netflix/iit_patna.jpg';
      badge = 'IIT PATNA';
      badgeType = 'cyan';
      rating = 'M.Tech Research';
    } else {
      image = '/assets/netflix/cloud_backend.jpg';
      badge = item.period && item.period.includes('PRESENT') ? 'CURRENT ROLE' : 'EXPERIENCE';
      badgeType = 'ruby';
      rating = item.period || 'Engineering';
    }
  } else if (category === 'skill') {
    title = item.name;
    subtitle = `${(item.items || []).length} Frameworks & Tools`;
    desc = (item.items || []).join(' • ');
    tags = item.items || [];
    badge = 'TECH STACK';
    badgeType = 'violet';
    rating = 'Core Expertise';

    if (item.name === 'AI & ML') {
      image = '/assets/netflix/ai_talent_blog.jpg';
      badgeType = 'cyan';
    } else if (item.name === 'Databases' || item.name === 'Cloud & Tools') {
      image = '/assets/netflix/cloud_inventory_blog.jpg';
      badgeType = 'emerald';
    } else {
      image = '/assets/netflix/skills_tech.jpg';
    }
  } else if (category === 'certification') {
    title = item.title;
    subtitle = item.issuer || 'Award / Patent';
    desc = item.detail || '';
    tags = [item.issuer || 'Patent Office'];
    rating = 'Verified';

    if (item.title && item.title.includes('Luggage')) {
      image = '/assets/netflix/gps_patent.jpg';
      badge = 'PATENT PUBLISHED';
      badgeType = 'gold';
    } else if (item.title && item.title.includes('Agricultural')) {
      image = '/assets/netflix/agri_patent.jpg';
      badge = 'PATENT PUBLISHED';
      badgeType = 'gold';
    } else if (item.title && item.title.includes('Codeathon')) {
      image = '/assets/netflix/codeathon_award.jpg';
      badge = '4TH PLACE TROPHY';
      badgeType = 'ruby';
    } else {
      image = '/assets/netflix/iit_patna.jpg';
      badge = 'VERIFIED CERT';
      badgeType = 'emerald';
    }
  } else if (category === 'blog') {
    title = item.title;
    subtitle = `${item.category} • ${item.date}`;
    desc = `Published on Medium. System architecture and engineering insights.`;
    tags = [item.category, item.date];
    badge = 'MEDIUM PUBLICATION';
    badgeType = 'emerald';
    rating = 'Technical Article';

    if (item.title && item.title.includes('Inventory')) {
      image = '/assets/netflix/cloud_inventory_blog.jpg';
    } else {
      image = '/assets/netflix/ai_talent_blog.jpg';
    }
  } else if (category === 'testimonial') {
    title = item.name;
    subtitle = item.role;
    desc = `"${item.content}"`;
    image = '/assets/netflix/recommendation.jpg';
    badge = item.impact || 'VERIFIED LEAD';
    badgeType = 'gold';
    tags = [item.impact || 'Architectural Lead'];
    rating = '5.0 ★ Endorsement';
  }

  return (
    <div
      className={`netflix-card netflix-card-${badgeType}`}
      onClick={() => onSelect(item, category)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item, category);
        }
      }}
    >
      <div
        className="netflix-card-media"
        style={{ backgroundImage: `url("${image}")` }}
      >
        <div className="netflix-card-media-overlay" />
        {badge && <span className={`netflix-card-top-badge badge-${badgeType}`}>{badge}</span>}
        <span className="netflix-card-rating">{rating}</span>
      </div>

      <div className="netflix-card-body">
        <div>
          <h4 className="netflix-card-title">{title}</h4>
          <p className="netflix-card-desc">{subtitle || desc}</p>
        </div>

        <div className="netflix-card-tags">
          {tags.slice(0, 3).map((t, idx) => (
            <span key={idx} className={`netflix-card-tag tag-${badgeType}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetflixCard;