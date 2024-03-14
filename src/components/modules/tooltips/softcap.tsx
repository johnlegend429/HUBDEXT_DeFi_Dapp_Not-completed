import { RefAttributes } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';

function SoftcapTooltip() {
  const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip className="my-tooltip" id="button-tooltip" {...props}>
          <p> Minimum amount that the project intends to collect.</p>
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

export default SoftcapTooltip;