import {FC, useState} from 'react';
import {View} from 'react-native';
import TimePicker from '../../component/time-picker/TimePicker';

const Duration: FC = () => {
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);

  const handleTimeChange = (hours: number, minutes: number) => {
    setSelectedHours(hours);
    setSelectedMinutes(minutes);
    console.log('Selected time:', {hours, minutes});
  };

  const item = {
    time: 0, // Example value for 'time'
  };
  return (
    <View>
      <TimePicker item={item} onTimeChange={handleTimeChange} />
    </View>
  );
};

export default Duration;
