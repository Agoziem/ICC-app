import Link from 'next/link';
import React from 'react';

function NewsPostItem({ item }) {
  return (
    <div className="post-item clearfix">
      <img src={item.img_url} alt="" />
      <h6
>
        <Link href={`/articles/${item.slug}`}>{item.title}</Link>
      </h6>
      <p>{item.subtitle}...</p>
    </div>
  );
}

export default NewsPostItem;
