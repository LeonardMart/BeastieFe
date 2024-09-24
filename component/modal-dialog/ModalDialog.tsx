import {FC, useEffect, useState} from 'react';
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import Background from './Background';
import CloseIcon from '../../icon/close-icon/close-icon';
import RoundWarning from '../../icon/round-warning/round-warning';
import RedWarning from '../../icon/round-warning/red-warning';
import BlueWarning from '../../icon/round-warning/blue-warning';

interface IModalDialog {
  visible: boolean;
  type: 'confirm-red' | 'warning';
  title: string;
  desc: string;
  yesBtn?: string;
  noBtn?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ModalDialog: FC<IModalDialog> = ({
  visible,
  type,
  title,
  desc,
  yesBtn,
  noBtn,
  onConfirm,
  onCancel,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    setShowModal(visible);
  }, [visible]);
  const iconType = () => {
    return (
      <>
        {type == 'confirm-red' ? (
          <View className="bg-red-50 py-3 px-3 rounded-2xl">
            <RedWarning />
          </View>
        ) : (
          type == 'warning' && (
            <View className="bg-primary-50 py-3 px-3 rounded-2xl">
              <BlueWarning />
            </View>
          )
        )}
      </>
    );
  };
  return (
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <View className="flex h-full">
        <Background/>
        <View className="h-[45%] z-30 flex bg-[#FFFFFF] w-full rounded-t-2xl rounded-tr-2xl bottom-0 absolute pt-6">
          <View className="flex flex-row px-4 pb-3 justify-end items-center border-b-[1px] border-neutral-200">
            <TouchableOpacity onPress={onCancel}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          <View className="justify-between w-full h-[85%]">
            <View className="w-full space-y-6 items-center py-6 px-4">
              {iconType()}

              <View className="items-center space-y-3">
                <Text className="text-center font-bold text-base text-neutral-800">
                  {title}
                </Text>
                <Text className="tracking-wide leading-6 text-center text-sm text-neutral-500">
                  {desc}
                </Text>
              </View>
            </View>

            <View className="z-50 flex flex-row px-4 w-full items-center justify-between">
              {type == 'confirm-red' && (
                <TouchableOpacity
                  onPress={onCancel}
                  className="py-3 w-44 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-2xl ">
                  <Text className="text-neutral-800 font-bold text-sm">
                    {noBtn}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={onConfirm}
                className={
                  type == 'confirm-red'
                    ? 'py-3 w-44 items-center bg-red-500 border-neutral-200 border-[1px] rounded-2xl'
                    : 'py-3 w-full items-center bg-primary-500 border-neutral-200 border-[1px] rounded-2xl'
                }>
                <Text className="text-[#FFFFFF] font-bold text-sm">{yesBtn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDialog;
