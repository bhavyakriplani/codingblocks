import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FeedContext } from '../contexts/FeedContext';
import Header from './Header';

function Feed() {
  const {
    posts,
    searchQuery, // eslint-disable-line no-unused-vars
    setSearchQuery,
    scrollPosition,
    setScrollPosition,
    parentRef,
  } = useContext(FeedContext);
  const navigate = useNavigate();

  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const handlePostClick = (id) => {
    setScrollPosition(virtualizer.getScrollElement().scrollTop);
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition, parentRef]);

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
        <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
          {virtualItems.map((virtualItem) => {
            const post = posts[virtualItem.index];
            return (
              <div
                key={virtualItem.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onClick={() => handlePostClick(post.id)}
              >
                {post && (
                  <div className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Feed;
