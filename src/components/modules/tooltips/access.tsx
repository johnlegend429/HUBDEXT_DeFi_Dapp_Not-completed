import { RefAttributes } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';

function AccessTooltip() {
  const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip className="my-tooltip"  id="button-tooltip" {...props}>
       <p> Project Type:<br></br> Private means that you have to be accepted and whitelisted.
Public means that anyone can invest.</p>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      overlay={renderTooltip}
    >
      <i className="fa fa-info"></i>
    </OverlayTrigger>
  );
}

export default AccessTooltip;