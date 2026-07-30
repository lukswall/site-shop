'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Camera,
  Menu,
  Minus,
  Plus,
  Scissors,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'
import './store.css'

type Category = 'Todos' | 'Barba' | 'Cabelo' | 'Corpo' | 'Perfumes'

type Product = {
  id: number
  name: string
  category: Exclude<Category, 'Todos'>
  price: number
  description: string
  badge?: string
  visual: string
  image?: string
  imageAlt?: string
}

const STORE = {
  name: 'Barbearia Cruzzz',
  whatsapp: '5511999999999',
}

const products: Product[] = [
  { id: 1, name: 'Óleo para o Corpo', category: 'Corpo', price: 59.9, description: 'Ocean Vetiver • Toque seco e hidratação', badge: 'Mais vendido', visual: 'dropper', image: '/products/cruzzz/oleo-corporal.png', imageAlt: 'Óleo para o Corpo Ocean Vetiver da Barbearia Cruzzz' },
  { id: 2, name: 'Pomada Efeito Matte', category: 'Cabelo', price: 48.9, description: 'Noir Cedar • Fixação forte e acabamento natural', visual: 'tin', image: '/products/cruzzz/pomada-efeito-matte.png', imageAlt: 'Pomada Efeito Matte Noir Cedar da Barbearia Cruzzz' },
  { id: 3, name: 'Sauvage Eau de Parfum', category: 'Perfumes', price: 799.9, description: 'Dior • Bergamota, patchouli e baunilha', badge: 'Importado', visual: 'perfume', image: '/products/dior-sauvage.jpg', imageAlt: 'Frasco e embalagem do perfume Dior Sauvage' },
  { id: 4, name: 'Creme para Barba', category: 'Barba', price: 54.9, description: 'Imperial Oud • Hidratação e maciez', visual: 'jar', image: '/products/cruzzz/creme-barba.png', imageAlt: 'Creme para Barba Imperial Oud da Barbearia Cruzzz' },
  { id: 5, name: 'Shampoo Atlas Fresh', category: 'Cabelo', price: 42.9, description: 'Limpeza e sensação refrescante', visual: 'bottle', image: '/products/cruzzz/shampoo.png', imageAlt: 'Shampoo Atlas Fresh da Barbearia Cruzzz' },
  { id: 6, name: 'Acqua di Giò Pour Homme', category: 'Perfumes', price: 649.9, description: 'Giorgio Armani • Fresco e aquático', badge: 'Clássico', visual: 'perfume tall', image: '/products/catalogo/10_acqua_di_gio_giorgio_armani.png', imageAlt: 'Acqua di Giò Pour Homme de Giorgio Armani' },
  { id: 7, name: "J'adore", category: 'Perfumes', price: 749.9, description: 'Dior • Floral feminino', badge: 'Importado', visual: 'perfume', image: '/products/catalogo/01_jadore_dior.png', imageAlt: "J'adore da Dior" },
  { id: 8, name: 'La Vie Est Belle', category: 'Perfumes', price: 699.9, description: 'Lancôme • Floral gourmand', badge: 'Importado', visual: 'perfume', image: '/products/catalogo/02_la_vie_est_belle_lancome.png', imageAlt: 'La Vie Est Belle da Lancôme' },
  { id: 9, name: 'Good Girl', category: 'Perfumes', price: 729.9, description: 'Carolina Herrera • Oriental floral', badge: 'Importado', visual: 'perfume', image: '/products/catalogo/03_good_girl_carolina_herrera.png', imageAlt: 'Good Girl de Carolina Herrera' },
  { id: 10, name: '212 VIP Rosé', category: 'Perfumes', price: 679.9, description: 'Carolina Herrera • Floral frutado', visual: 'perfume', image: '/products/catalogo/04_212_vip_rose_carolina_herrera.png', imageAlt: '212 VIP Rosé de Carolina Herrera' },
  { id: 11, name: 'Idôle', category: 'Perfumes', price: 639.9, description: 'Lancôme • Floral luminoso', visual: 'perfume', image: '/products/catalogo/05_idole_lancome.png', imageAlt: 'Idôle da Lancôme' },
  { id: 12, name: 'Scandal', category: 'Perfumes', price: 699.9, description: 'Jean Paul Gaultier • Floral adocicado', visual: 'perfume', image: '/products/catalogo/06_scandal_jean_paul_gaultier.png', imageAlt: 'Scandal de Jean Paul Gaultier' },
  { id: 13, name: 'Libre', category: 'Perfumes', price: 759.9, description: 'Yves Saint Laurent • Floral aromático', badge: 'Destaque', visual: 'perfume', image: '/products/catalogo/07_libre_yves_saint_laurent.png', imageAlt: 'Libre de Yves Saint Laurent' },
  { id: 14, name: '212 VIP Black', category: 'Perfumes', price: 689.9, description: 'Carolina Herrera • Aromático masculino', visual: 'perfume', image: '/products/catalogo/08_212_vip_black_carolina_herrera.png', imageAlt: '212 VIP Black de Carolina Herrera' },
  { id: 15, name: 'Eros', category: 'Perfumes', price: 659.9, description: 'Versace • Fresco, oriental e amadeirado', badge: 'Importado', visual: 'perfume', image: '/products/catalogo/09_eros_versace.png', imageAlt: 'Eros da Versace' },
  { id: 16, name: 'Body Splash Urban Bleu', category: 'Corpo', price: 69.9, description: 'Grapefruit, gengibre, incenso e cedro', badge: 'Novo', visual: 'bottle', image: '/products/cruzzz/body-splash.png', imageAlt: 'Body Splash Urban Bleu da Barbearia Cruzzz' },
]

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function ProductVisual({ kind, image, imageAlt }: { kind: string; image?: string; imageAlt?: string }) {
  if (image) return <img className={`real-product-image${image.includes('/products/cruzzz/') ? ' cruazz-product-image' : ''}`} src={image} alt={imageAlt ?? ''} />
  return (
    <div className={`product-visual ${kind}`} aria-hidden="true">
      <span className="product-cap" />
      <span className="product-body">
        <small>CRUZZZ</small>
        <strong>{kind.includes('perfume') ? 'Nº 17' : 'GROOMING'}</strong>
      </span>
    </div>
  )
}

export default function HomePage() {
  const [category, setCategory] = useState<Category>('Todos')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleProducts = category === 'Todos' ? products : products.filter((item) => item.category === category)
  const cartItems = useMemo(
    () => products.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] })),
    [cart],
  )
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const addToCart = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
    setCartOpen(true)
  }

  const changeQuantity = (id: number, amount: number) => {
    setCart((current) => {
      const next = (current[id] || 0) + amount
      const updated = { ...current }
      if (next <= 0) delete updated[id]
      else updated[id] = next
      return updated
    })
  }

  const whatsappUrl = useMemo(() => {
    const lines = cartItems.map((item) => `• ${item.quantity}x ${item.name} — ${money.format(item.price * item.quantity)}`)
    const text = [`Olá! Gostaria de fazer este pedido:`, '', ...lines, '', `Total: ${money.format(cartTotal)}`].join('\n')
    return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`
  }, [cartItems, cartTotal])

  return (
    <div className="site-shell">
      <div className="announcement">ENTREGA LOCAL • ATENDIMENTO PERSONALIZADO PELO WHATSAPP</div>

      <header className="header">
        <a className="brand" href="#inicio" aria-label={`${STORE.name}, início`}>
          <img className="brand-horizontal" src="/logo-horizontal-cruzzz.png" alt="Barbearia Cruzzz" />
          <img className="brand-symbol" src="/simbolo-cruzzz.png" alt="Barbearia Cruzzz" />
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navegação principal">
          <a href="#produtos" onClick={() => setMenuOpen(false)}>Produtos</a>
          <a href="#ritual" onClick={() => setMenuOpen(false)}>Nosso ritual</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Abrir sacola com ${cartCount} itens`}>
            <ShoppingBag size={19} /> Sacola <span>{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="eyebrow">DESDE 2018 • ESTILO É PRESENÇA</p>
            <h1>Seu ritual.<br /><em>Sua marca.</em></h1>
            <p className="hero-text">Produtos escolhidos por barbeiros para homens que valorizam cuidado, personalidade e uma boa primeira impressão.</p>
            <div className="hero-actions">
              <a className="button gold" href="#produtos">Explorar produtos <ArrowRight size={17} /></a>
              <a className="text-link" href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer">Falar com um especialista</a>
            </div>
            <div className="proof">
              <span><Check size={15} /> Curadoria profissional</span>
              <span><Check size={15} /> Compra pelo WhatsApp</span>
            </div>
          </motion.div>

          <motion.div className="hero-art" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}>
            <span className="hero-number">17</span>
            <div className="hero-bottle">
              <i />
              <div><small>CRUZZZ</small><strong>ÉLITE</strong><span>EAU DE PARFUM</span></div>
            </div>
            <div className="scent-note"><Sparkles size={17} /><span><small>NOTAS DE</small>Madeira • Âmbar • Couro</span></div>
          </motion.div>
        </section>

        <section className="benefits" aria-label="Diferenciais">
          <div><strong>01</strong><span><b>Seleção de barbeiro</b>Produtos testados no dia a dia</span></div>
          <div><strong>02</strong><span><b>Perfumes marcantes</b>Fragrâncias para cada ocasião</span></div>
          <div><strong>03</strong><span><b>Atendimento humano</b>Converse antes de escolher</span></div>
        </section>

        <section className="products-section" id="produtos">
          <div className="section-heading">
            <div><p className="eyebrow">CURADORIA CRUZZZ</p><h2>Escolhas para o seu ritual</h2></div>
            <p>Do acabamento perfeito à fragrância que fica na memória.</p>
          </div>
          <div className="filters" role="group" aria-label="Filtrar produtos">
            {(['Todos', 'Barba', 'Cabelo', 'Corpo', 'Perfumes'] as Category[]).map((item) => (
              <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <motion.div layout className="product-grid">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product) => (
                <motion.article className="product-card" key={product.id} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .25 }}>
                  <div className="product-image">
                    {product.badge && <span className="badge">{product.badge}</span>}
                    <ProductVisual kind={product.visual} image={product.image} imageAlt={product.imageAlt} />
                    <button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Adicionar ${product.name} à sacola`}><Plus size={18} /></button>
                  </div>
                  <div className="product-info">
                    <p>{product.category}</p><h3>{product.name}</h3><span>{product.description}</span>
                    <div><strong>{money.format(product.price)}</strong><button onClick={() => addToCart(product.id)}>Adicionar</button></div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="catalog-note">Catálogo demonstrativo para estudo. Marcas pertencem aos seus respectivos titulares e os preços são meramente ilustrativos.</p>
        </section>

        <section className="ritual" id="ritual">
          <div className="ritual-art"><div className="barber-pole" /><Scissors size={58} strokeWidth={1} /></div>
          <div className="ritual-copy">
            <p className="eyebrow">MAIS QUE APARÊNCIA</p>
            <h2>O cuidado começa<br />com uma boa escolha.</h2>
            <p>Nossa seleção nasce na cadeira do barbeiro. Indicamos cada produto pensando no seu tipo de cabelo, barba, rotina e personalidade.</p>
            <ul>
              <li><span>01</span>Conte como é o seu estilo</li>
              <li><span>02</span>Receba uma indicação personalizada</li>
              <li><span>03</span>Finalize diretamente pelo WhatsApp</li>
            </ul>
            <a className="button outline" href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer">Quero uma indicação <ArrowRight size={17} /></a>
          </div>
        </section>
      </main>

      <footer id="contato">
        <div className="footer-main">
          <div><p className="eyebrow">PRONTO PARA ELEVAR SEU ESTILO?</p><h2>Seu próximo favorito<br />está aqui.</h2></div>
          <a className="button gold" href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer">Conversar no WhatsApp <ArrowRight size={17} /></a>
        </div>
        <div className="footer-bottom">
          <a className="brand footer-brand" href="#inicio" aria-label="Barbearia Cruzzz, voltar ao início"><img src="/logo-barbearia-cruzzz.png" alt="Barbearia Cruzzz" /></a>
          <p>Seg–Sáb • 09h às 19h</p>
          <a href="#" aria-label="Instagram"><Camera size={19} /> @barbeariaimperial</a>
          <small>© 2026 Barbearia Cruzzz</small>
        </div>
      </footer>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.button className="drawer-backdrop" aria-label="Fechar sacola" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} aria-label="Sacola">
              <div className="drawer-header"><div><p>SUA SELEÇÃO</p><h2>Sacola <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar"><X /></button></div>
              <div className="drawer-content">
                {cartItems.length === 0 ? (
                  <div className="empty-cart"><ShoppingBag size={42} strokeWidth={1} /><h3>Sua sacola está vazia</h3><p>Adicione produtos e envie sua seleção pelo WhatsApp.</p><button className="button outline" onClick={() => setCartOpen(false)}>Ver produtos</button></div>
                ) : cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="mini-visual"><ProductVisual kind={item.visual} image={item.image} imageAlt={item.imageAlt} /></div>
                    <div><p>{item.category}</p><h3>{item.name}</h3><strong>{money.format(item.price)}</strong>
                      <div className="quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Diminuir"><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Aumentar"><Plus size={14} /></button></div>
                    </div>
                  </div>
                ))}
              </div>
              {cartItems.length > 0 && <div className="drawer-footer"><div><span>Total estimado</span><strong>{money.format(cartTotal)}</strong></div><p>O pagamento e a entrega serão combinados pelo WhatsApp.</p><a className="button whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">Enviar pedido no WhatsApp <ArrowRight size={17} /></a></div>}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <a className="floating-whatsapp" href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp">WA</a>
      <button className="scroll-cue" aria-label="Rolar para os produtos" onClick={() => document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth' })}><ChevronDown /></button>
    </div>
  )
}
