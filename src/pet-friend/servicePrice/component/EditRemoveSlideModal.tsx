import {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SlideModal from '../../../../component/slide-modal/SlideModal';
import TrashIcon from '../../../../icon/trash-icon/trash-icon';
import RedTrashIcon from '../../../../icon/trash-icon/red-trash-icon';
import EditIcon from '../../../../icon/edit-icon/edit-icon';
import NextArrow from '../../../../icon/next-arrow/next-arrow';
import ModalDialog from '../../../../component/modal-dialog/ModalDialog';

interface ISlideModal {
  visible: boolean;
  onClose: () => void;
  onEdit: ()=> void
  onRemove: ()=>void
}

const EditRemoveSlideModal: FC<ISlideModal> = ({visible, onClose, onEdit, onRemove}) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    setShowModal(visible);
  }, [visible]);
  console.log()

  useEffect(() => {
    console.log("visible", showModal)
  }, [showModal]);
  
  return (
    <>
      <SlideModal visible={showModal} onClose={onClose} closeOnBackground={onClose} height="h-[14%]">
        <View className=" flex flex-col h-full justify-between py-2">
          <TouchableOpacity onPress={onEdit}  className="px-3 flex flex-row justify-between items-center">
            <View className="flex flex-row space-x-3 items-center">
              <EditIcon />
              <Text className="text-neutral-800 font-semibold text-sm">
                Edit Task Service
              </Text>
            </View>
            <NextArrow />
          </TouchableOpacity>

          <View className="h-[1px] w-full bg-neutral-200"></View>

          <TouchableOpacity
            onPress={() => setShowDeleteModal(!showDeleteModal)}
            className="px-3 py-1 flex flex-row justify-between items-center">
            <View className="flex flex-row space-x-3 items-center">
              <RedTrashIcon />
              <Text className="text-red-500 font-semibold text-sm">
                Remove Task Service
              </Text>
            </View>
            <NextArrow />
          </TouchableOpacity>
        </View>
      </SlideModal>
      <ModalDialog
        visible={showDeleteModal}
        type="confirm-red"
        title="Remove Task Service?"
        desc="Your task service will be removed."
        yesBtn="Yes, Remove"
        noBtn="No, Don't"
        onConfirm={() => {
          setShowDeleteModal(false);
          setShowModal(false);
          onRemove();
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default EditRemoveSlideModal;
