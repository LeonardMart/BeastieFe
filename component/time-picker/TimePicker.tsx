import React, {FC, useState} from 'react';
import {TouchableOpacity, Text, View, Platform, StyleSheet} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import CalenderIcon from '../../icon/calender/calender';
import ClockIcon from '../../icon/clock-icon/clock-icon';

interface Props {
  item: {
    time?: number;
  };
  onTimeChange: (hours: number, minutes: number) => void;
}

const TimePicker: FC<Props> = ({
  item,
  onTimeChange,
}) => {
  const [time, setTime] = useState<Date>(
    item.time ? new Date(item.time) : new Date(),
  );
  const [show, setShow] = useState<boolean>(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedValue: Date | undefined,
  ) => {
    if (selectedValue) {
      setTime(selectedValue);
      setShow(false); // Close the time picker modal after selecting a time
      onTimeChange(selectedValue.getHours(), selectedValue.getMinutes());
    }
  };

  const showTimePicker = () => {
    setShow(true);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  return (
    <View className="">
      <TouchableOpacity style={styles.touchable} onPress={showTimePicker}>
        <Text style={styles.text}>{formatTime(time)}</Text>
        <View>
          <ClockIcon />
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
  },
  text: {
    fontSize: 16,
    color: '#757575',
  },
});

export default TimePicker;
