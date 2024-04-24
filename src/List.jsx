// const List = (props) => {
//   const { items } = props
//   return (
//     <>
//       {items.map(function (item) {
//         const { id, title, status } = item
//         return (
//           <article className='todo-item' key={id}>
//             <p>{title}</p>
//             <div className='btn-container'>
//               <button className='edit-btn'>edit</button>
//               <button className='delete-btn'>delete</button>
//             </div>
//           </article>
//         )
//       })}
//     </>
//   )
// }

// export default List

const List = (props) => {
  const { items, removeItem, editItem } = props
  return (
    <>
      {items.map(function (item) {
        const { id, title, status } = item
        return (
          <article className='todo-item' key={id}>
            <p className={status == 'complete' ? 'complete' : 'active'}>
              {title}
            </p>
            <div className='btn-container'>
              <button className='edit-btn' onClick={() => editItem(id)}>
                edit
              </button>
              <button className='delete-btn' onClick={() => removeItem(id)}>
                delete
              </button>
            </div>
          </article>
        )
      })}
    </>
  )
}
export default List
