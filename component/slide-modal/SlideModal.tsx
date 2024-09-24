import {Children, FC, ReactNode, useEffect, useMemo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../icon/close-icon/close-icon';
import Background from '../../component/slide-modal/Background';

interface ISlideModal {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
  height: string;
  title?: string;
  closeOnBackground?: () => void;
  //   onAdd: (a: IAddPet[]) => void;
}

const petType = [
  {label: 'Dog', value: '1'},
  {label: 'Cat', value: '2'},
  {label: 'Other', value: '3'},
];
const transparent = `rgba(0,0,0,0.5)`;
const SlideModal: FC<ISlideModal> = ({
  visible,
  onClose,
  children,
  height,
  title,
  closeOnBackground,
}) => {
  const [visibl, setVisible] = useState(false);

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
                <View className="flex flex-col">
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

export default SlideModal;
