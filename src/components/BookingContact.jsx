import React, { useState } from 'react';

export default function BookingContact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/netlify/functions/contact', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section id="vizite" className="w-full py-24 px-6 md:px-12 bg-stone/30 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-forest text-sm md:text-base font-semibold uppercase tracking-widest mb-4 block">
                        Planifică o Vizită
                    </span>
                    <h2 className="text-4xl md:text-6xl font-heading text-text-main font-bold mb-6">
                        Te Așteptăm în Livadă
                    </h2>
                    <p className="text-lg md:text-xl text-text-main/70 font-light max-w-2xl mx-auto">
                        Descoperă magia culesului și bucură-te de aer curat. Află regulile casei și contactează-ne pentru programări de grup sau evenimente speciale.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Rules & Details */}
                    <div className="flex flex-col">
                        <h3 className="text-3xl font-heading font-bold mb-8 flex items-center gap-3">
                            <span className="text-forest">✽</span> Informații Utile
                        </h3>

                        <ul className="space-y-6 text-lg text-text-main/80 font-light">
                            <li className="flex items-start gap-4">
                                <span className="text-terracotta font-bold mt-1">1.</span>
                                <span><strong className="font-semibold text-text-main">Programarea e esențială.</strong> Te rugăm să ne anunți vizita cu cel puțin 24h înainte, pentru a ne asigura că suntem la livadă și avem fructe coapte pe alese.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-terracotta font-bold mt-1">2.</span>
                                <span><strong className="font-semibold text-text-main">Respectă natura.</strong> Culegem cu grijă, nu rupem crengile și protejăm pomii mai tineri. Copiii sunt bineveniți și încurajați să învețe!</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-terracotta font-bold mt-1">3.</span>
                                <span><strong className="font-semibold text-text-main">Degustarea.</strong> Bineînțeles că poți degusta direct din pom! Însă recolta pentru acasă se cântărește și se achită la plecare.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-terracotta font-bold mt-1">4.</span>
                                <span><strong className="font-semibold text-text-main">Animale de companie.</strong> Din motive de igienă și siguranță alimentară, animăluțele de companie trebuie ținute în lesă și doar pe aleile principale.</span>
                            </li>
                        </ul>

                        <div className="mt-12 bg-cream p-8 rounded-2xl border border-black/5 shadow-sm">
                            <h4 className="font-bold font-heading text-2xl mb-4">Contact Direct</h4>
                            <p className="text-text-main/80 mb-2 font-light">Preferi să ne suni sau să ne scrii pe WhatsApp?</p>
                            <a href="tel:+40700000000" className="text-2xl font-bold tracking-wider text-forest hover:text-terracotta transition-colors block mb-4">
                                07xx xxx xxx
                            </a>
                            <p className="text-sm text-text-main/60 italic">*Număr placeholders. Completează în cod.</p>
                        </div>

                        {/* Google Map Embed */}
                        <div className="mt-8 rounded-2xl overflow-hidden shadow-md h-64 border border-black/5 relative">
                            <iframe
                                src="https://maps.google.com/maps?q=46.033076,23.475022&z=15&output=embed"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                title="Google Maps Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-black/5">
                        <h3 className="text-3xl font-heading font-bold mb-2">Scrie-ne un mesaj</h3>
                        <p className="text-text-main/60 font-light mb-8">Pentru vizite de grup, achiziții angro sau colaborări.</p>

                        {status === 'success' ? (
                            <div className="bg-forest/10 border border-forest/20 text-forest p-6 rounded-xl animate-[fadeIn_0.5s_ease-out]">
                                <p className="font-bold text-lg mb-2">Mesaj Trimis cu Succes!</p>
                                <p>Îți mulțumim. Petre Morar sau un membru al familiei te va contacta în cel mai scurt timp posibil.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 text-sm font-semibold hover:underline"
                                >
                                    Trimite alt mesaj
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-text-main/80">Numele Tău</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-stone/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest transition-shadow"
                                        placeholder="Ion Popescu"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-text-main/80">Adresă de Email sau Telefon</label>
                                    <input
                                        type="text"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-stone/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest transition-shadow"
                                        placeholder="Date de contact..."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-text-main/80">Mesajul Tău</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows="4"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-stone/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest transition-shadow resize-none"
                                        placeholder="Bună, aș dori să programez o vizită pentru..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md
                    ${status === 'loading'
                                            ? 'bg-stone text-text-main/50 cursor-not-allowed'
                                            : 'bg-forest text-cream hover:bg-forest/90 hover:shadow-forest/20'
                                        }
                  `}
                                >
                                    {status === 'loading' ? 'Se trimite...' : 'Trimite Mesajul'}
                                </button>

                                {status === 'error' && (
                                    <p className="text-red-500 text-sm text-center">A apărut o eroare la trimiterea mesajului. Te rugăm să încerci telefonic.</p>
                                )}
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
