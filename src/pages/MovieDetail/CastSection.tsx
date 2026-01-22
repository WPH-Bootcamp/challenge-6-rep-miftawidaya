import type { FC } from 'react';
import type { CastMember } from '../../types/movie';

interface CastSectionProps {
  cast: CastMember[];
}

/**
 * Cast & Crew section displaying actor portraits and character names.
 */
export const CastSection: FC<Readonly<CastSectionProps>> = ({ cast }) => {
  if (cast.length === 0) return null;

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='md:text-display-md text-neutral-10 text-xl font-bold'>
        Cast & Crew
      </h2>
      {/* Cast Grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {cast.map((member) => (
          <div key={member.id} className='flex items-center gap-4 md:gap-10'>
            {/* Cast Image */}
            <div className='h-26 w-17.25 shrink-0 overflow-hidden rounded-lg bg-neutral-800'>
              {member.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                  alt={member.name}
                  className='h-full w-full object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center text-neutral-500'>
                  N/A
                </div>
              )}
            </div>
            {/* Cast Info */}
            <div className='flex flex-col gap-1'>
              <span className='md:text-md text-neutral-10 text-sm font-semibold'>
                {member.name}
              </span>
              <span className='md:text-md text-sm font-normal text-neutral-400'>
                {member.character}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
