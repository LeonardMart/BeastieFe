import {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SlideModal from '../../../component/slide-modal/SlideModal';
import RedTrashIcon from '../../../icon/trash-icon/red-trash-icon';
import EditIcon from '../../../icon/edit-icon/edit-icon';
import NextArrow from '../../../icon/next-arrow/next-arrow';

interface ISlideModal {
  pickupBtn: string;
  selfBtn: string;
  visible: boolean;
  onClose: () => void;
  onPickup: () => void;
  onSelf: () => void;
}

const PickupSlideModal: FC<ISlideModal> = ({
    pickupBtn,
    selfBtn,
  visible,
  onClose,
  onPickup,
  onSelf,
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
        height="h-[15%]">
        <View className=" flex flex-col h-full justify-between py-2">
          <TouchableOpacity
            onPress={onPickup}
            className="px-3 flex flex-row justify-between items-center">
            <View className="flex flex-row space-x-3 items-center">
              <Text className="text-neutral-800 font-semibold text-sm">
                {pickupBtn}
              </Text>
            </View>
            <NextArrow color="neutral-500" />
          </TouchableOpacity>

          <View className="h-[1px] w-full bg-neutral-200"></View>

          <TouchableOpacity
            onPress={onSelf}
            className="px-3 py-1 flex flex-row justify-between items-center">
            <View className="flex flex-row space-x-3 items-center">
              <Text className="text-neutral-800 font-semibold text-sm">
                {selfBtn}
              </Text>
            </View>
            <NextArrow color="neutral-500" />
          </TouchableOpacity>

          <View className="h-[1px] w-full bg-neutral-200"></View>
        </View>
      </SlideModal>
    </>
  );
};

export default PickupSlideModal;
