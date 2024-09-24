import {FC, useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SlideModalEdit from './SlideModal';
import SlideModal from '../../../component/slide-modal/SlideModal';
import TrashIcon from '../../../icon/trash-icon/trash-icon';
import RedTrashIcon from '../../../icon/trash-icon/red-trash-icon';
import EditIcon from '../../../icon/edit-icon/edit-icon';
import NextArrow from '../../../icon/next-arrow/next-arrow';
import ModalDialog from '../../../component/modal-dialog/ModalDialog';
import {RegisterContext} from '../RegisterMain';

interface ISlideModal {
  visible: boolean;
  onClose: () => void;
  petId: string;
  onEdit: (b: 'Add' | 'Edit') => void;
}

interface PetInfo {
  tempId: string;
  name: string;
  petType: number;
  gender: string;
  dob: Date;
  breed: string;
}

const DeleteEditSlideModal: FC<ISlideModal> = ({
  visible,
  onClose,
  petId,
  onEdit,
}) => {
  const registerContext = useContext(RegisterContext);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  useEffect(() => {
    setShowModal(visible);
  }, [visible]);
  console.log();

  useEffect(() => {
    console.log('visible', showModal);
  }, [showModal]);

  const deleteHandler = () => {
    const deletedPet = registerContext?.pets.filter(data => {
      return data.tempId != petId;
    });
    if (deletedPet) {
      registerContext?.setPets(deletedPet);
    }
    setShowDeleteModal(false);
    setShowModal(false);
  };

  // const editPetHandler = (newPets: PetInfo) => {
  //   onEdit(newPets);
  //   onClose();
  // };

  return (
    <>
      <SlideModal
        visible={showModal}
        onClose={onClose}
        closeOnBackground={onClose}
        height="h-[14%]">
        <View className=" flex flex-col h-full justify-between py-2">
          <TouchableOpacity
            onPress={() => {
              setEditModal(true), onEdit('Edit');
            }}
            className="px-3 flex flex-row justify-between items-center">
            <View className="flex flex-row space-x-3 items-center">
              <EditIcon />
              <Text className="text-neutral-800 font-semibold text-sm">
                Edit Pet
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
                Remove Pet
              </Text>
            </View>
            <NextArrow />
          </TouchableOpacity>
        </View>
      </SlideModal>
      <ModalDialog
        visible={showDeleteModal}
        type="confirm-red"
        title="Remove Pet?"
        desc="Your pet will be removed."
        yesBtn="Yes, Remove"
        noBtn="No, Don't"
        onConfirm={deleteHandler}
        onCancel={() => setShowDeleteModal(false)}
      />
      {/* <SlideModalEdit
        visible={editModal}
        onClose={a => {
          setEditModal(a);
        }}
        onAdd={editPetHandler}
        petId={petId}
        state="Edit"
      /> */}
    </>
  );
};

export default DeleteEditSlideModal;
