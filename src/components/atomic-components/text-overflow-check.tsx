export const TextOverflowCheck: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {children}
    </div>
);