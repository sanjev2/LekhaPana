import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { LuView } from 'react-icons/lu';
import { useDeleteConsumerMutation } from '../../../provider/queries/Users.query';
import { toast } from 'sonner';
import { Button } from 'primereact/button';
import UpdateModel from './UpdateModel.user';

const TableCard = ({ data, id }: any) => {
  const [DeleteConsumer, DeleteConsumerResponse] = useDeleteConsumerMutation();
  const [visible, setVisible] = useState(false);

  const deleteHandler = (id: string) => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          const { data, error }: any = await DeleteConsumer(id);
          if (error) {
            toast.error(error.data.message);
            return;
          }
          toast.success(data.msg);
        } catch (e: any) {
          toast.error(e.message);
        }
      },
      reject: () => {
        console.log("reject for " + id);
      }
    });
  };

  return (
    <>
      <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {id}
        </th>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {data.name}
        </td>
        <td className="px-6 py-4">{data.email}</td>
        <td className="px-6 py-4">{data.mobile}</td>
        <td className="px-6 py-4">
          <button onClick={() => setVisible(!visible)} title="View" className="p-4 bg-teal-500 text-white rounded-sm mx-2">
            <LuView className="text-xl" />
          </button>
          <button onClick={() => setVisible(!visible)} title="Edit" className="p-4 bg-orange-400 text-white rounded-sm mx-2">
            <FaRegEdit className="text-xl" />
          </button>
          <Button
            loading={DeleteConsumerResponse.isLoading}
            onClick={() => deleteHandler(data.id)}
            title="Delete"
            className="p-4 bg-red-500 text-white rounded-sm mx-2"
          >
            <FaRegTrashAlt className="text-xl" />
          </Button>
        </td>
      </tr>
      <UpdateModel visible={visible} setVisible={setVisible} id={data.id} />
      <ConfirmDialog closable contentClassName="py-2" />
    </>
  );
};

export default TableCard;
