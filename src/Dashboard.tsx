import { CedarLogo } from "./CedarLogo.tsx";

type DashboardProps = {
  playing: boolean;
};

const items = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "orders", label: "Orders", icon: <OrdersIcon />, current: true },
  { id: "products", label: "Products", icon: <ProductsIcon /> },
  { id: "customers", label: "Customers", icon: <CustomersIcon /> },
  { id: "discounts", label: "Discounts", icon: <DiscountsIcon /> },
];

export function Dashboard({ playing }: DashboardProps) {
  return (
    <div
      className={playing ? "dashboard is-playing" : "dashboard"}
      aria-hidden="true"
    >
      <aside className="sidebar">
        <div className="store">
          <CedarLogo word="" />
          <span className="store-name">
            <span className="cedar-word">Cedar</span>
            <span>Goods</span>
          </span>
        </div>
        <nav className="nav" aria-label="Store">
          {items.map((item) => (
            <div
              key={item.id}
              className="nav-item"
              aria-current={item.current ? "page" : undefined}
            >
              {item.icon}
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="store-foot">
          <span className="live-dot" aria-hidden="true" />
          <span>Store is live</span>
        </div>
      </aside>
      <section className="main" aria-label="Orders">
        <header className="main-bar">
          <h2>Orders</h2>
        </header>
        <div className="empty">
          <BoxIcon />
          <h3>No orders yet</h3>
          <p>When a customer places an order, it will show up here.</p>
          <span className="app-button">Add product</span>
        </div>
      </section>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.75 7.1 8 2.75l5.25 4.35V13a.75.75 0 0 1-.75.75H3.5A.75.75 0 0 1 2.75 13V7.1Z" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.25 4.25h9.5M3.25 8h9.5M3.25 11.75h6" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.75 5.15 8 2.75l5.25 2.4v5.7L8 13.25l-5.25-2.4v-5.7Z" />
      <path d="M2.75 5.15 8 7.55l5.25-2.4M8 7.55v5.7" />
    </svg>
  );
}

function CustomersIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="5.4" r="2.15" />
      <path d="M3.4 13.15c.55-2.15 2.2-3.2 4.6-3.2s4.05 1.05 4.6 3.2" />
    </svg>
  );
}

function DiscountsIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="5.15" cy="5.15" r=".9" />
      <circle cx="10.85" cy="10.85" r=".9" />
      <path d="M11.35 4.65 4.65 11.35" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg className="empty-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.75 5.15 8 2.75l5.25 2.4v5.7L8 13.25l-5.25-2.4v-5.7Z" />
      <path d="M2.75 5.15 8 7.55l5.25-2.4M8 7.55v5.7" />
    </svg>
  );
}
