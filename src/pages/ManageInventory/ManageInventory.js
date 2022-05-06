import React from 'react';
import { Button, Table } from 'react-bootstrap';
import useInventoryItems from '../../hooks/useInventoryItems';
import { TrashIcon } from '@heroicons/react/solid';

const ManageInventory = () => {
    const [inventoryItems, setInventoryItems] = useInventoryItems();
    const tableHeadTitles = ["Item Name", "Price", "Quantity","Supplier","Img","Delete"]

    const handleDeleteItem = id => {
        const proceed = window.confirm("Are you sure you want to delete this item?");
        if(proceed){
            console.log('deleting the item with id:',id);
            const url = `http://localhost:5000/bike/${id}`;

            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    }

    return (
        <div className='mx-5'>
            <h1 className='text-center my-4'>All Items</h1>
            <Button className='d-block ms-auto' variant='danger'>Add Items</Button>
            <Table responsive className='text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        {tableHeadTitles.map((title, index) => (
                            <th key={index}><p>{title}</p></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        inventoryItems.map((item,index) =>
                        
                            <tr key={item._id}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.supplierName}</td>
                                <td><img src={item.img} width="50" alt="" /></td>
                                <td><span><TrashIcon onClick={() => handleDeleteItem(item._id)} style={{width:'30px',cursor:'pointer',color:'lightgreen'}}></TrashIcon></span></td>
                            </tr>
                        )
                    }


                </tbody>
            </Table>
        </div>
    );
};

export default ManageInventory;