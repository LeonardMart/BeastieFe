import {FC} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchIcon from '../../icon/search-icon/search-icon';
import {ChangeEvent} from 'react-native-maps';
import CloseIcon from '../../icon/close-icon/close-icon';

interface Props {
  value?: string;
  name: string;
  placeHolder?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onClear?: () => void;
  className?: string;
}

export const SearchBar: FC<Props> = ({
  value,
  name,
  className,
  onChange,
  onClear,
  placeHolder,
}) => {
  return (
    <View className="flex flex-row h-fit items-center bg-[#FFFFFF] px-2.5 border-[1px] border-neutral-200 rounded-[14px]">
      {onClear && value != '' ? (
        <TouchableOpacity onPress={onClear} className="p-1 bg-[#FFFFFF]">
          <CloseIcon width={12} height={12} />
        </TouchableOpacity>
      ) : (
        <SearchIcon width={12} height={12} />
      )}
      <View className='w-full h-8 items-center'>
        <TextInput
          id={name}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          placeholderTextColor='#94A3B8'
          className="w-full bg-[#FFFFFF] h-8 text-sm items-center py-1 text-neutral-800"
        />
      </View>
    </View>
  );
};
