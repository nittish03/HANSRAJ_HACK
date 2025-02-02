export function Card({ children }: { children: React.ReactNode }) {
    return <div className="border rounded-lg shadow-md p-4">{children}</div>;
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-2">{children}</div>;
  }
  
  export function CardTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
  }
  