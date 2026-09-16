import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import { EndOfTrainingSection } from '../components/EndOfTrainingSection';
import {
  GraduationCap,
  CheckCircle2,
  Circle,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles
} from 'lucide-react';

export const TrainingPortal: React.FC = () => {
  const { currentUser, modules, isModuleCompleted, toggleModuleComplete, progress } = useForge();
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || 'mod-1');
  const [filterPhase, setFilterPhase] = useState<'All' | 'Foundation' | 'Graduated Field Practice' | 'Mastery & Capstone'>('All');

  if (!currentUser) return null;

  const userProgressCount = modules.filter(m => isModuleCompleted(m.id)).length;
  const progressPercent = Math.round((userProgressCount / modules.length) * 100);

  const selectedModule = modules.find(m => m.id === selectedModuleId) || modules[0];
  const isSelectedCompleted = isModuleCompleted(selectedModule.id);

  const filteredModules = filterPhase === 'All'
    ? modules
    : modules.filter(m => m.phase === filterPhase);

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto', color: '#f8fafc' }}>

      {/* Header banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid #1f2937',
        paddingBottom: '1.5rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'Oswald',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginBottom: '4px'
          }}>
            <GraduationCap size={16} /> 60-Day Operator Training Portal
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', margin: 0, letterSpacing: '0.06em', color: '#fff' }}>
            SALES OPERATOR CURRICULUM
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '4px 0 0', maxWidth: '650px' }}>
            Restructured from <code>OPERATOR-PLAYBOOK.md</code>: The exact research filter, AI spec site engine, 3-minute cold call script, and live-edit closing discipline.
          </p>
        </div>

        {/* Overall Progress Gauge */}
        <div style={{
          background: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          minWidth: '260px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'Oswald', fontSize: '0.85rem', color: '#94a3b8', letterSpacing: '0.08em' }}>
              TRAINING PROGRESS
            </span>
            <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: '#10b981' }}>
              {progressPercent}%
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>{userProgressCount} of {modules.length} Modules</span>
            <span>{modules.length - userProgressCount} Remaining</span>
          </div>
        </div>
      </div>

      {/* §5a End of Training Call / Compensation Section */}
      <EndOfTrainingSection />

      {/* Phase Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {(['All', 'Foundation', 'Graduated Field Practice', 'Mastery & Capstone'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilterPhase(tab)}
            style={{
              background: filterPhase === tab ? '#1e293b' : 'transparent',
              color: filterPhase === tab ? '#f8fafc' : '#94a3b8',
              border: `1px solid ${filterPhase === tab ? '#c9a84c' : '#334155'}`,
              borderRadius: '20px',
              padding: '6px 14px',
              fontFamily: 'Oswald',
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid: Left module list, Right module viewer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

        {/* Left Column: Modules List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredModules.map(mod => {
            const completed = isModuleCompleted(mod.id);
            const isSelected = mod.id === selectedModuleId;

            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #0f172a, #1e293b)' : '#0b0f19',
                  border: `1px solid ${isSelected ? '#c9a84c' : completed ? '#10b98144' : '#1e293b'}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleModuleComplete(mod.id);
                      }}
                      title={completed ? 'Mark uncompleted' : 'Mark completed'}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        marginTop: '2px',
                        color: completed ? '#10b981' : '#475569'
                      }}
                    >
                      {completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>

                    <div>
                      <div style={{
                        fontFamily: 'Oswald',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        color: '#c9a84c',
                        textTransform: 'uppercase',
                        marginBottom: '2px'
                      }}>
                        Day {mod.day_number} • {mod.phase}
                      </div>
                      <h3 style={{
                        fontFamily: 'Roboto',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: isSelected ? '#fff' : '#e2e8f0',
                        margin: '0 0 4px',
                        lineHeight: 1.3
                      }}>
                        {mod.title}
                      </h3>
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '0.8rem',
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {mod.summary}
                      </p>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.7rem',
                    color: '#64748b',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    <Clock size={11} /> {mod.read_time_minutes}m
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Module Content */}
        <div style={{
          background: '#0b0f19',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '2rem',
          position: 'sticky',
          top: '90px',
          height: 'fit-content'
        }}>
          {selectedModule ? (
            <div>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                borderBottom: '1px solid #1e293b',
                paddingBottom: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{
                    fontFamily: 'Oswald',
                    fontSize: '0.85rem',
                    color: '#c9a84c',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    DAY {selectedModule.day_number} MODULE • {selectedModule.phase}
                  </div>
                  <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#fff', margin: '0 0 6px', letterSpacing: '0.04em' }}>
                    {selectedModule.title}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {selectedModule.read_time_minutes} minute study
                    </span>
                    <span>•</span>
                    <span style={{ color: isSelectedCompleted ? '#10b981' : '#e0157a' }}>
                      {isSelectedCompleted ? '✓ Completed' : '○ Not yet completed'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleModuleComplete(selectedModule.id)}
                  style={{
                    background: isSelectedCompleted ? '#10b981' : '#1e293b',
                    color: isSelectedCompleted ? '#fff' : '#c9a84c',
                    border: `1px solid ${isSelectedCompleted ? '#10b981' : '#c9a84c'}`,
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontFamily: 'Oswald',
                    fontSize: '0.85rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isSelectedCompleted ? (
                    <>
                      <CheckCircle2 size={16} /> Completed
                    </>
                  ) : (
                    <>
                      <Circle size={16} /> Mark Complete
                    </>
                  )}
                </button>
              </div>

              {/* Module Content rendered */}
              <div style={{
                color: '#cbd5e1',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}>
                <div dangerouslySetInnerHTML={{
                  __html: selectedModule.content
                    .replace(/## (.*?)\n/g, '<h3 style="font-family: Bebas Neue; font-size: 1.6rem; color: #fff; margin: 1.5rem 0 0.5rem; letterSpacing: 0.05em;">$1</h3>')
                    .replace(/### (.*?)\n/g, '<h4 style="font-family: Oswald; font-size: 1.1rem; color: #c9a84c; margin: 1.25rem 0 0.4rem; letterSpacing: 0.05em;">$1</h4>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #f8fafc;">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em style="color: #cbd5e1;">$1</em>')
                    .replace(/> (.*?)\n/g, '<blockquote style="border-left: 3px solid #e0157a; padding-left: 1rem; margin: 0.75rem 0; color: #f472b6; font-style: italic;">$1</blockquote>')
                    .replace(/\n\n/g, '<p style="margin-bottom: 1rem;"></p>')
                }} />
              </div>

              {/* Action Item Box */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(224,21,122,0.06))',
                border: '1px solid #c9a84c55',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <div style={{ fontFamily: 'Oswald', fontSize: '0.85rem', color: '#c9a84c', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  🎯 Today's Field Action Item
                </div>
                <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5 }}>
                  {selectedModule.action_item}
                </div>
              </div>
            </div>
          ) : (
            <div>Select a module to view</div>
          )}
        </div>

      </div>
    </div>
  );
};
