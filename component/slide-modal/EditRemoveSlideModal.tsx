import {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SlideModal from './SlideModal';
import RedTrashIcon from '../../icon/trash-icon/red-trash-icon';
import EditIcon from '../../icon/edit-icon/edit-icon';
import NextArrow from '../../icon/next-arrow/next-arrow';
import ModalDialog from '../modal-dialog/ModalDialog';

interface ISlideModal {
  editBtn: string;
  removeBtn: string;
  visible: boolean;
  onClose: () => void;
  onRemove: () => void;
  onEdit: () => void;
}

const EditRemoveSlideModal: FC<ISlideModal> = ({
  editBtn,
  removeBtn,
  visible,
  onClose,
  onRemove,
  onEdit,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  return (
    <>
      <SlideModal
        visible={showModal}
        onClose={onClose}
        closeOnBackground={onClose}
        height="h-[14%]">
        <View className=" flex flex-col h-full justify-between py-2">
          <TouchableOpacity
            onPress={onEdit}
            className="px-3 flex flex-row justify-between items-center">
            <View className="flex flex-row space-x-3 items-center">
              <EditIcon />
              <Text className="text-neutral-800 font-semibold text-sm">
                {editBtn}
              </Text>
            </View>
            <NextArrow />
          </TouchableOpacity>

          <View className="h-[1px] w-full bg-neutral-200"></View>

          <TouchableOpacity
            onPress={onRemove}
            className="px-3 py-1 flex flex-row justify-between items-center">
            <View className="flex flex-row space-x-3 items-center">
              <RedTrashIcon />
              <Text className="text-red-500 font-semibold text-sm">
                {removeBtn}
              </Text>
            </View>
            <NextArrow />
          </TouchableOpacity>
        </View>
      </SlideModal>
      {/* <ModalDialog
        visible={showDeleteModal}
        type="confirm-red"
        title={`Remove ${removeBtn}`}
        desc="Your task service will be removed."
        yesBtn="Yes, Remove"
        noBtn="No, Don't"
        onConfirm={() => {
          setShowDeleteModal(false);
          onConfirmRemove();
        }}
        onCancel={() => setShowDeleteModal(false)}
      /> */}
    </>
  );
};

export default EditRemoveSlideModal;
