import React from 'react'

const ArticleComments = ({ comments }) => {
  // shorten the comment.comment 
  
  
  return (
    <div>
      {
        comments.slice(0,5).map((comment,index) => (
          <div key={comment.id} className="mb-4">
            <div className="d-flex">
              <div>
                <div
                  className="rounded-circle text-white d-flex justify-content-center align-items-center"
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: "20px",
                    backgroundColor: "var(--bgDarkerColor)",
                  }}
                >
                  {comment.author[0].toUpperCase()}
                </div>
              </div>
              <div className="ms-3">
                <p className="mb-0 fw-bold">{comment.author}</p>
                <p className="mb-0">{
                  comment.comment.length > 300 ?
                    comment.comment.slice(0, 300) + "..."
                    : comment.comment
                
                }</p>
                <div className='mt-2'>
                  <span>
                    <small>{new Date(comment.date).toDateString()}</small>
                  </span>
                </div>
              </div>
            </div>
            {
              index !== comments.length - 1 && <hr />
            }
          </div>
        ))
      }
      <div className="text-center mb-5">
        <button
          className="btn btn-primary rounded "
          style={{ minWidth: "250px" }}
        >
          Load more
        </button>
      </div>
    </div>
  )
}

export default ArticleComments