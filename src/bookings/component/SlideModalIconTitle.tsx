import {Children, FC, ReactNode, useEffect, useMemo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../../icon/close-icon/close-icon';
import Background from '../../../component/slide-modal/Background';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';

interface ISlideModal {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
  height: string;
  title?: string;
  iconSelect?: string;
  closeOnBackground?: () => void;
  //   onAdd: (a: IAddPet[]) => void;
}

const petType = [
  {label: 'Dog', value: '1'},
  {label: 'Cat', value: '2'},
  {label: 'Other', value: '3'},
];
const transparent = `rgba(0,0,0,0.5)`;
const SlideModalIconTitle: FC<ISlideModal> = ({
  visible,
  onClose,
  children,
  height,
  title,
  closeOnBackground,
  iconSelect,
}) => {
  const [visibl, setVisible] = useState(false);

  const showSelectedPet = (type: string | undefined) => {
    if (type === 'Dog') {
      return (
        <View className="w-[36px] h-[36px] bg-primary-50 items-center justify-center rounded-lg">
          <DogTypeIcon width={20} height={20} />
        </View>
      );
    }
    if (type === 'Cat') {
      return (
        <View className="w-[36px] h-[36px] bg-yellow-50 items-center justify-center rounded-lg">
          <CatTypeIcon width={20} height={20} />
        </View>
      );
    }
    return (
      <View className="w-[36px] h-[36px] bg-red-50 items-center justify-center rounded-lg">
        <OtherTypeIcon width={20} height={20} />
      </View>
    );
  };

  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  return (
    <Modal visible={visibl} animationType="slide" transparent={true}>
      <View className="flex h-full">
        <Background onPress={closeOnBackground} />
        <View
          className={`${height} z-30 flex bg-[#FFFFFF] w-full rounded-t-2xl rounded-tr-2xl bottom-0 pt-6 absolute`}>
          {title && (
            <View className="flex flex-row px-4 pb-3 justify-between border-b-[1px] border-neutral-200 items-center">
              <View className="flex flex-row space-x-3 items-center">
                {showSelectedPet(iconSelect)}
                <View className="flex flex-col">
                  <Text className='font-semibold text-[10px] text-neutral-500'>Add task</Text>
                  <Text className="font-semibold text-base text-neutral-800">
                    {title}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={onClose}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
          )}

          <View className="flex flex-col justify-between h-full">
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SlideModalIconTitle;
