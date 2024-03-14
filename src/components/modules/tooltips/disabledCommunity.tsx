import { RefAttributes } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';

function ComingSoonCommunity() {
  const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip className="my-tooltip" id="button-tooltip" {...props}>
          <p> Coming soon!</p>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={renderTooltip}
    >
      <p>Community</p>
    </OverlayTrigger>
  );
}

export default ComingSoonCommunity;