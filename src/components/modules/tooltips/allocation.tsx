import { RefAttributes } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';

function AllocationTooltip() {
  const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip className="my-tooltip" id="button-tooltip" {...props}>
          <p> It is the maximum amount you can invest.</p>
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

export default AllocationTooltip;