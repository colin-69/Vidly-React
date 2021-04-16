const ListGroup = (props) => {
   const { items, textProperty, valueProperty, onSelect, selectedItem } = props;
   return (
      <ul className='list-group'>
         {items.map((item) => (
            <li
               onClick={() => onSelect(item)}
               key={item[valueProperty]}
               className={
                  item === selectedItem
                     ? "list-group-item active"
                     : "list-group-item"
               }>
               {item[textProperty]}
            </li>
         ))}
      </ul>
   );
};

ListGroup.defaultProps = {
   textProperty: "name",
   valueProperty: "_id",
};

export default ListGroup;
