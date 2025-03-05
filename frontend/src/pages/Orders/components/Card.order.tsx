import { ConfirmDialog } from 'primereact/confirmdialog';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { Button } from 'primereact/button';
import { BsPrinter } from 'react-icons/bs';
import { useDeleteOrderMutation } from '../../../provider/queries/Orders.query';
import ShowAndPrintModel from './ShowAndPrint.model';

const TableCard = ({ data, id }: any) => {
  const [deleteOrder, deleteOrderResponse] = useDeleteOrderMutation();
  const [visible, setVisible] = useState(false);

  const deleteHandler = async (orderId: string) => {
    try {
      const { data: responseData, error }: any = await deleteOrder(orderId);
      if (error) {
        toast.error(error.data.message);
        return;
      }
      toast.success(responseData.msg);
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  
  return (
    <>
      <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {id}
        </th>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {data?.Consumer?.name}
        </td>
        <td className="px-6 py-4">
          {data?.Consumer?.email}
        </td>
        <td className="px-6 py-4">
          <ul>
            {data.items.length > 0 &&
              data.items.map((cur: any, i: number) => (
                <li key={i}>{cur?.name} - &#8377;{cur?.price}/-</li>
              ))
            }
          </ul>
        </td>
        <td className="px-6 py-4">
          <button onClick={() => setVisible(!visible)} title="View" className="p-4 bg-teal-500 text-white rounded-sm mx-2">
            <BsPrinter className="text-xl" />
          </button>
          <Button
            loading={deleteOrderResponse.isLoading}
            onClick={() => deleteHandler(data.id)}
            title="Delete"
            className="p-4 bg-red-500 text-white rounded-sm mx-2"
          >
            <FaRegTrashAlt className="text-xl" />
          </Button>
        </td>
      </tr>
      <ShowAndPrintModel id={data.id} visible={visible} setVisible={setVisible} />
      <ConfirmDialog closable contentClassName="py-2" />
    </>
  );
};

export default TableCard;
