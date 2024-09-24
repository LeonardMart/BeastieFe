import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Platform, StyleSheet} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import CalenderIcon from '../../icon/calender/calender';

interface Props {
  item: {
    time?: number;
  };
  minimumDate:Date
  maximumDate?:Date
  onDate: (a: Date) => void;
}

const DatePicker: FC<Props> = ({item, onDate, minimumDate, maximumDate}) => {
  const [date, setDate] = useState<Date>(
    item.time ? new Date(item.time) : new Date(),
  );
  const [time, setTime] = useState<Date>(
    item.time ? new Date(item.time) : new Date(),
  );
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);

  useEffect(()=>{
    setDate(new Date(item.time??new Date()))
  },[item])
//   const onChange = (
//     event: DateTimePickerEvent,
//     selectedValue: Date | undefined,
//   ) => {
//     setShow(Platform.OS === 'ios');
//     if (mode === 'date') {
//       const currentDate = selectedValue || new Date();
//       setDate(currentDate);
//       setMode('time');
//       setShow(Platform.OS !== 'ios');
//     } else {
//       const selectedTime = selectedValue || new Date();
//       setTime(selectedTime);
//       setShow(Platform.OS === 'ios');
//       setMode('date');
//     }
//   };

const onChange = (event: DateTimePickerEvent, selectedValue: Date | undefined) => {
    if (selectedValue) {
        setDate(selectedValue);
        setMode('date');
        setShow(false); // Close the date picker modal after selecting a date
        onDate(selectedValue)
    }
};


  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View>
      <TouchableOpacity className='flex flex-row justify-between items-center px-3 py-2.5 bg-neutral-100 rounded-[14px]' onPress={showDatePicker}>
        <Text className='text-sm text-neutral-500'>{formatDate(date)}</Text>
        <View><CalenderIcon/></View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          // minimumDate={new Date(1900, 0, 1)}
          // maximumDate={new Date()} // Changed the minimum date format
          display="default"
          mode={mode}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default DatePicker;
