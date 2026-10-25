import goldShapeLogo from "../../../../../..assets/goldshape-logo.png";
import { LoginForm } from "./login-form";
import "./login.css";

type PreviewProduct = {
  id: string;
  name: string;
  variant: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  tag?: string;
  jarBody: string;
  jarAccent: string;
  featured?: boolean;
};

// Dados apenas ilustrativos da prévia (não vêm da API).
const PREVIEW_PRODUCTS: PreviewProduct[] = [
  {
    id: "whey",
    name: "Whey Protein",
    variant: "900g, Chocolate",
    price: "R$ 149,90",
    oldPrice: "R$ 169,90",
    badge: "-12%",
    tag: "DESTAQUE",
    jarBody: "#a8d14a",
    jarAccent: "#f58a33",
    featured: true,
  },
  {
    id: "creatina",
    name: "Creatina",
    variant: "300g",
    price: "R$ 89,90",
    jarBody: "#2f8f4e",
    jarAccent: "#a8d14a",
  },
  {
    id: "pre-treino",
    name: "Pré-treino",
    variant: "300g, Limão",
    price: "R$ 119,90",
    oldPrice: "R$ 129,90",
    badge: "-8%",
    jarBody: "#f58a33",
    jarAccent: "#3a3a3a",
  },
];

const PREVIEW_CATEGORIES = ["Todos", "Whey", "Creatina", "Pré-treino"];

const HIGHLIGHTS = ["Produtos e variações", "Estoque e descontos", "Áreas de entrega"];

function ProductJar({ body, accent }: { body: string; accent: string }) {
  return (
    <svg className="product-card__jar" viewBox="0 0 64 80" fill="none" aria-hidden="true">
      <rect x="14" y="4" width="36" height="12" rx="3" fill="#232925" />
      <rect x="10" y="14" width="44" height="6" rx="2" fill="#343b36" />
      <rect x="8" y="18" width="48" height="58" rx="9" fill={body} />
      <rect x="8" y="34" width="48" height="26" fill="#fff" fillOpacity="0.93" />
      <rect x="14" y="40" width="22" height="5" rx="2" fill={accent} />
      <rect x="14" y="49" width="32" height="3" rx="1.5" fill="#3a3a3a" />
      <rect x="14" y="54" width="24" height="3" rx="1.5" fill="#3a3a3a" fillOpacity="0.45" />
      <rect x="12" y="22" width="5" height="46" rx="2.5" fill="#fff" fillOpacity="0.16" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="m5 8.2 2.1 2.1L11 6.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Brand({ className }: { className?: string }) {
  return (
    <a className={className ? `brand ${className}` : "brand"} href="/" aria-label="GOLDSHAPE">
      <img className="brand-mark" src={goldShapeLogo} alt="" width={44} height={44} />
      <span>
        <span className="brand__name-gold">GOLD</span>SHAPE
      </span>
    </a>
  );
}

export function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-layout">
        <section className="login-showcase" aria-label="Apresentação do painel GOLDSHAPE">
          <span className="login-showcase__glow login-showcase__glow--one" />
          <span className="login-showcase__glow login-showcase__glow--two" />

          <Brand />

          <div className="login-showcase__content">
            <span className="eyebrow">
              <span />
              PAINEL GOLDSHAPE
            </span>

            <h1>
              Seu catálogo de suplementos,{" "}
              <span className="login-showcase__headline-accent">sempre no ponto.</span>
            </h1>

            <p className="login-showcase__description">
              Cadastre produtos, controle estoque e preços e defina as áreas de entrega da sua loja
              em um só lugar.
            </p>

            <div className="catalog-preview" aria-hidden="true">
              <span className="catalog-preview__sparkle catalog-preview__sparkle--one">✦</span>
              <span className="catalog-preview__sparkle catalog-preview__sparkle--two">✦</span>

              <div className="catalog-preview__topbar">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="catalog-preview__dots">
                    <span className="catalog-preview__dot catalog-preview__dot--red" />
                    <span className="catalog-preview__dot catalog-preview__dot--yellow" />
                    <span className="catalog-preview__dot catalog-preview__dot--green" />
                  </span>
                  <span className="catalog-preview__title">Catálogo GOLDSHAPE</span>
                </div>
                <span className="catalog-preview__count">3 produtos</span>
              </div>

              <div className="catalog-preview__chips">
                {PREVIEW_CATEGORIES.map((category, index) => (
                  <span
                    key={category}
                    className={index === 0 ? "catalog-chip catalog-chip--active" : "catalog-chip"}
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="catalog-preview__grid">
                {PREVIEW_PRODUCTS.map((product) => (
                  <article
                    key={product.id}
                    className={
                      product.featured ? "product-card product-card--featured" : "product-card"
                    }
                  >
                    <div className="product-card__media">
                      {product.badge && (
                        <span className="product-card__badge">{product.badge}</span>
                      )}
                      {product.tag && <span className="product-card__tag">{product.tag}</span>}
                      <ProductJar body={product.jarBody} accent={product.jarAccent} />
                    </div>

                    <span className="product-card__name">{product.name}</span>
                    <span className="product-card__variant">{product.variant}</span>

                    <div className="product-card__prices">
                      <span className="product-card__price">{product.price}</span>
                      {product.oldPrice && (
                        <span className="product-card__old-price">{product.oldPrice}</span>
                      )}
                    </div>

                    <span className="product-card__stock">Em estoque</span>
                  </article>
                ))}
              </div>
            </div>

            <ul className="login-showcase__highlights">
              {HIGHLIGHTS.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="login-showcase__copyright">
            © {new Date().getFullYear()} GOLDSHAPE. Todos os direitos reservados.
          </p>
        </section>

        <section className="login-panel" aria-label="Acesso ao painel">
          <div className="login-panel__content">
            <Brand className="login-panel__mobile-brand" />

            <span className="login-panel__welcome">BEM-VINDO DE VOLTA</span>
            <h2>
              Acesse o painel da <span>GOLDSHAPE</span>
            </h2>
            <p className="login-panel__subtitle">
              Entre para gerenciar produtos, categorias e entregas da sua loja.
            </p>

            <LoginForm />
          </div>

          <p className="login-panel__footer">© {new Date().getFullYear()} GOLDSHAPE Suplementos</p>
        </section>
      </div>
    </main>
  );
}
