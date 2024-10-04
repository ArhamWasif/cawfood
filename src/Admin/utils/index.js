export const onDelete = async (id,setFoodItem,foodItem) => {
    let response = await fetch(`http://localhost:5000/api/delete/product/${id}`, {
        method: 'DELETE',
      });
      response = await response.json();
      console.log('response',response);
      if(response?.success){
     setFoodItem([...foodItem].filter((item) => item?._id != id))
        }
}