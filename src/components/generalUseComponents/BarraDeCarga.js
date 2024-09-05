import ReactDOM from 'react-dom';
import './BarraDeCarga.css';

const BarraDeCarga = (props) => {    

    const Backdrop = () => {
        return <div className="backdrop-root" />;
        };

    return (
        <>
            { props.progress < 100 &&

                ReactDOM.createPortal(
                    <Backdrop />,
                    document.getElementById('backdrop-root')
                )

            }

            { props.progress < 100 &&

                ReactDOM.createPortal(
                    <ProgressBar percentage={props.progress} />,
                    document.getElementById('overlay-root')
                ) 

            }
        </>   
    );

}
export default BarraDeCarga;

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress bar-root" style={{ height: '25px' }}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}%
      </div>
    </div>
  );
}