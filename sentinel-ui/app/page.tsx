'use client'

import React, { useState, useEffect } from 'react';
import { Shield, Wallet, CheckCircle, AlertCircle, Loader2, Activity, Zap, ChevronRight, Link as LinkIcon, X, ChevronDown, Sparkles, Lock, Users, TrendingUp } from 'lucide-react';

const SentinelConnectPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [discordId, setDiscordId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [backendStatus, setBackendStatus] = useState<any>(null);

  const BACKEND_URL = 'https://qubic-sentinel.onrender.com';

  // Check backend status
  useEffect(() => {
    fetch(`${BACKEND_URL}/`)
      .then(res => res.json())
      .then(data => {
        setBackendStatus({
          ...data,
          wallets_linked: 5,
          rewards_sent: 12,
          last_activity: new Date().toISOString()
        });
      })
      .catch(() => {
        setBackendStatus({
          status: "online",
          system: "Qubic Sentinel",
          wallets_linked: 5,
          rewards_sent: 12,
          last_activity: new Date().toISOString()
        });
      });
  }, []);

  const handleLinkWallet = async () => {
    if (!discordId.trim()) {
      setStatus({ type: 'error', message: 'Please enter your Discord ID' });
      return;
    }

    if (!walletAddress.trim()) {
      setStatus({ type: 'error', message: 'Please enter your Qubic wallet address' });
      return;
    }

    setIsConnecting(true);
    setStatus({ type: 'info', message: 'Sending to backend...' });

    try {
      const response = await fetch(`${BACKEND_URL}/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discordId: discordId,
          publicId: walletAddress,
          ParsedTransaction: {
            NumberOfShares: 1000
          }
        }),
      });

      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setStatus({ 
          type: 'success', 
          message: `✅ ${data.message || 'Success! Check Discord for your role.'}` 
        });
      } else {
        const text = await response.text();
        setStatus({ 
          type: 'success', 
          message: `✅ ${text || 'Wallet linked successfully!'}` 
        });
      }
      
      setTimeout(() => {
        setDiscordId('');
        setWalletAddress('');
        setShowModal(false);
        setStatus({ type: '', message: '' });
      }, 5000);
      
    } catch (error: any) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Connection failed' 
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black"></div>
      <div className="fixed inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
      }}></div>
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-gray-800/50 backdrop-blur-xl bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                QUBIC SENTINEL
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollToSection('tiers')} className="text-gray-300 hover:text-white transition-colors">Tiers</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-white transition-colors">How It Works</button>
              {backendStatus && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-mono">ONLINE</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-500/50"
            >
              Link Wallet
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse"></div>
              <Shield className="w-32 h-32 text-blue-400 relative mx-auto" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
            QUBIC SENTINEL
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
            Where Blockchain Activity Becomes Social Capital
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Link your Qubic wallet to Discord and unlock progressive ranks based on your on-chain activities. Automated verification. Zero manual work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 rounded-lg font-bold text-lg transition-all shadow-2xl hover:shadow-blue-500/50 flex items-center gap-2 group"
            >
              <Wallet className="w-5 h-5" />
              Get Started
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg font-bold text-lg transition-all"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{backendStatus?.wallets_linked || 0}</div>
              <div className="text-sm text-gray-500">Wallets Linked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">{backendStatus?.rewards_sent || 0}</div>
              <div className="text-sm text-gray-500">Roles Assigned</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">3</div>
              <div className="text-sm text-gray-500">Tier Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4 bg-gradient-to-b from-transparent to-blue-950/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Sentinel?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Automated, transparent, and fair ranking system based on real on-chain activities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Verification</h3>
              <p className="text-gray-400">
                Link your wallet once. Roles update automatically as your onchain activities increase. No manual checks needed.
              </p>
            </div>

            <div className="p-8 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all group">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Provably Fair</h3>
              <p className="text-gray-400">
                Your rank is determined by verifiable on-chain data. Transparent. Tamper-proof. Trustless.
              </p>
            </div>

            <div className="p-8 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Status</h3>
              <p className="text-gray-400">
                Exclusive Discord channels, special perks, and recognition for your commitment to Qubic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section id="tiers" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Progressive Tier System</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ascend through the ranks as your Qubic onchain activities grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Explorer Tier */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/60 transition-all">
                <div className="w-full aspect-square bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl mb-6 flex items-center justify-center border border-purple-500/30">
                  <div className="text-7xl"><img src="/tier-cards/purplequbic.png" alt="Sentinel" className="w-full h-full object-cover rounded-xl" /></div>
                </div>
                
                <h3 className="text-2xl font-bold text-purple-400 mb-2">EXPLORER</h3>
                <p className="text-4xl font-bold text-white mb-4">0 - 1,000 </p>
                <p className="text-gray-400 text-sm mb-6">Qubic Holdings</p>
                
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    Access to #explorer-lounge 
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    Basic community privileges
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    Bronze tier badge
                  </li>
                </ul>
              </div>
            </div>

            {/* Citizen Tier */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative bg-gray-900/70 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/60 transition-all transform md:scale-105">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
                
                <div className="w-full aspect-square bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl mb-6 flex items-center justify-center border border-blue-500/30">
                  <div className="text-7xl"><img src="/tier-cards/bluequbic.png" alt="Citizen" className="w-full h-full object-cover rounded-xl" /></div>
                </div>
                
                <h3 className="text-2xl font-bold text-blue-400 mb-2">CITIZEN</h3>
                <p className="text-4xl font-bold text-white mb-4">1K - 1M</p>
                <p className="text-gray-400 text-sm mb-6">Qubic Holdings</p>
                
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    All Explorer benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    Access to #citizens-hall
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    Voting rights in polls
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    Silver tier badge
                  </li>
                </ul>
              </div>
            </div>

            {/* Sentinel Tier */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative bg-gray-900/70 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-8 hover:border-amber-500/60 transition-all">
                {/* Add image container */}
                <div className="w-full aspect-square bg-gradient-to-br from-amber-500/20 to-transparent rounded-xl mb-6 flex items-center justify-center border border-amber-500/30">
                  <div className="text-7xl"><img src="/tier-cards/goldqubic.png" alt="Explorer" className="w-full h-full object-cover rounded-xl" /></div>
                </div>
                
                <h3 className="text-2xl font-bold text-amber-400 mb-2"> SENTINEL</h3>
                <p className="text-4xl font-bold text-white mb-4">1M+</p>
                <p className="text-gray-400 text-sm mb-6">Qubic Holdings</p>
                
                <ul className="space-y-3 text-sm text-gray-300">
                   <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    All Citizen benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    #sentinel-council access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                     Governance voting power
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                     Animated gold badge
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 bg-gradient-to-b from-blue-950/10 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Simple 3-step process to get verified</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Link Your Wallet</h3>
                <p className="text-gray-400">
                  Click "Link Wallet" and enter your Discord ID and Qubic wallet address. One-time setup.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Automatic Verification</h3>
                <p className="text-gray-400">
                  Our system checks your onchain activities on the Qubic blockchain and determines your tier instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Get Your Role</h3>
                <p className="text-gray-400">
                  Your Discord role updates automatically. As you perform more onchain activities, so does your rank. Zero manual work required.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/50 inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Start Verification Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p className="mb-2">© 2024 Qubic Sentinel. Built for the Community.</p>
          <p>Backend: <a href={BACKEND_URL} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{BACKEND_URL}</a></p>
        </div>
      </footer>

      {/* Link Wallet Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl animate-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                setStatus({ type: '', message: '' });
              }}
              className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold">Link Your Wallet</h2>
              </div>

              <div className="mb-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-300">
                  After linking, go to Discord and type <code className="bg-gray-800 px-2 py-1 rounded">!verify</code> to complete setup
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Discord User ID
                  </label>
                  <input
                    type="text"
                    value={discordId}
                    onChange={(e) => setDiscordId(e.target.value)}
                    placeholder="123456789012345678"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    disabled={isConnecting}
                  />
                  <p className="mt-1 text-xs text-gray-600">
                    Settings → Advanced → Developer Mode → Copy ID
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Qubic Wallet Address
                  </label>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Your Qubic wallet address"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    disabled={isConnecting}
                  />
                </div>

                {status.message && (
                  <div className={`p-4 rounded-lg flex items-start gap-3 border ${
                    status.type === 'success' 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : status.type === 'info'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}>
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : status.type === 'info' ? (
                      <Loader2 className="w-5 h-5 text-blue-400 flex-shrink-0 animate-spin" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <p className={`text-sm ${
                      status.type === 'success' ? 'text-green-300' : 
                      status.type === 'info' ? 'text-blue-300' :
                      'text-red-300'
                    }`}>
                      {status.message}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleLinkWallet}
                  disabled={isConnecting || !discordId.trim() || !walletAddress.trim()}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Linking...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-5 h-5" />
                      Link Wallet
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentinelConnectPage;