import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {View, Text} from 'react-native';

const initialState = {
  selectedIndex: 0,
  itemsCount: 0,
};

const StepperContext = createContext({...initialState});

interface IProps {
  selectedIndex: number;
  children: React.ReactNode;
}

interface ListProps {
  children?: ReactNode;
}

export const Separator = () => {
  return <View style={{width: 4, height: 1, backgroundColor: 'gray'}} />;
};

export const StepperList: FC<ListProps> = ({children}) => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
      {children}
    </View>
  );
};

export const StepperItem: React.FC<{order: number; label: string}> = ({
  order,
  label,
}) => {
  const {selectedIndex} = useContext(StepperContext);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {order > 1 && <Separator />}
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedIndex + 1 >= order ? 'purple' : 'gray',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            {order}
          </Text>
        </View>
        <Text style={{color: 'gray', fontSize: 16, marginLeft: 10}}>
          {label}
        </Text>
      </View>
    </View>
  );
};

interface PanelProps {
  children: React.ReactNode;
}

export const StepperPanels: React.FC<PanelProps> = ({children}) => {
  return <View style={{flex: 1}}>{children}</View>;
};

export const StepperPanel: React.FC<PanelProps> = ({children}) => {
  return <View style={{flex: 1}}>{children}</View>;
};

const Stepper: React.FC<IProps> = ({selectedIndex, children}) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(prevState => ({...prevState, selectedIndex}));
  }, [selectedIndex]);

  return (
    <View>
      <StepperContext.Provider value={state}>
        {children}
      </StepperContext.Provider>
    </View>
  );
};

export default Stepper;

Stepper.defaultProps = {
  selectedIndex: 1,
};

export {default as NextButton} from './NextButton';
export {default as PrevButton} from './PrevButton';
