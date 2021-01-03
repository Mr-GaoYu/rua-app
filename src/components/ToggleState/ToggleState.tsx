import React from 'react';

interface RenderProps {
    open: boolean;
    toggle: () => void;
}
interface ToggleStateProps {
    children: (p: RenderProps) => JSX.Element;
}

const ToggleState: React.FC<ToggleStateProps> = React.memo(props => {
    const { children } = props;
    const [open, setOpen] = React.useState<boolean>(false)

    const toggle = () => setOpen(!open);

    return children({ open, toggle });

})

export default ToggleState;
