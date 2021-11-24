import { useEffect, useState } from 'react';
import { ReactComponent as IconRotateCW } from '../icons/rotate_90_degrees_cw.svg';
import { ReactComponent as IconRotateCCW } from '../icons/rotate_90_degrees_ccw.svg';
import { isMobile } from 'react-device-detect';

export function MobileControls (props: {
  show?: boolean;
  onClickCW?: () => void;
  onClickCCW?: () => void;
}) {
  const [show, setShow] = useState(props.show);
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  if (show && isMobile) {
    return (
      <>
        <div style={{
          position: 'fixed',
          bottom: 20,
          width: '100%',
          textAlign: 'center',
        }}>
          <IconRotateCW
            onClick={props.onClickCCW}
            style={{
              cursor: 'pointer',
              height: '60px',
              fill: '#dfdfdf',
              marginRight: '40px',
            }}/>
          <IconRotateCCW
            onClick={props.onClickCW}
            style={{
              cursor: 'pointer',
              height: '60px',
              fill: '#dfdfdf',
            }}/>
        </div>
      </>
    );
  } else {
    return <></>
  }
}
