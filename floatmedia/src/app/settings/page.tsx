'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import {
  Settings,
  Key,
  User,
  CreditCard,
  Trash2,
  Plus,
  Shield,
  AlertTriangle,
  ExternalLink,
  Check,
} from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks';
import { cn } from '@/lib/utils';

function Section({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useScrollAnimation<HTMLDivElement>();
  return (
    <div ref={ref} style={{ transitionDelay: delay ? `${delay}ms` : undefined }} className={cn('transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6', className)}>
      {children}
    </div>
  );
}

const platformOptions = [
  { value: 'x', label: 'X (Twitter)' },
  { value: 'linkedin', label: 'LinkedIn' },
];

const detailLevelOptions = [
  { value: 'concise', label: 'Concise' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'detailed', label: 'Detailed' },
];

const brandVoiceOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'technical', label: 'Technical' },
  { value: 'creative', label: 'Creative' },
];

export default function SettingsPage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [apiKeyPlatform, setApiKeyPlatform] = useState('x');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [brandVoice, setBrandVoice] = useState('professional');
  const [detailLevel, setDetailLevel] = useState('balanced');

  const [apiKeys, setApiKeys] = useState([
    { id: '1', platform: 'x', maskedKey: '••••••••xyz123', maskedSecret: '••••••••secret1' },
    { id: '2', platform: 'linkedin', maskedKey: '••••••••abc789', maskedSecret: '••••••••secret2' },
  ]);

  const [connectedAccounts] = useState([
    { id: '1', platform: 'x', username: '@johndoe', connected: true },
    { id: '2', platform: 'linkedin', username: 'John Doe', connected: true },
  ]);

  const handleAddApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !apiSecret) return;

    const newKey = {
      id: Date.now().toString(),
      platform: apiKeyPlatform,
      maskedKey: `••••••••${apiKey.slice(-4)}`,
      maskedSecret: `••••••••${apiSecret.slice(-4)}`,
    };

    setApiKeys((prev) => [...prev, newKey]);
    setApiKey('');
    setApiSecret('');
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#08080f] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Section delay={0}>
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-[#7c6aef]" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
        </Section>

        {/* Profile */}
        <Section delay={100}>
          <Card className="bg-[#10101c] border-[#1a1a30]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#6e6e85]" />
                <CardTitle className="text-white">Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="w-20 h-20 rounded-full bg-[#1a1a30] flex items-center justify-center">
                  <User className="h-10 w-10 text-[#4a4a60]" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-1 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Subscription */}
        <Section delay={200}>
          <Card className="bg-[#10101c] border-[#1a1a30]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#6e6e85]" />
                <CardTitle className="text-white">Subscription</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-1">
                    Current Plan
                  </p>
                  <p className="text-xl font-semibold text-white">Free</p>
                </div>
                <Button>
                  Upgrade to Pro
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* API Keys */}
        <Section delay={300}>
          <Card className="bg-[#10101c] border-[#1a1a30]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-[#6e6e85]" />
                <CardTitle className="text-white">API Keys</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleAddApiKey} className="space-y-4 p-4 bg-[#08080f] rounded-lg border border-[#1a1a30]">
                <div>
                  <label className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-1 block">
                    Platform
                  </label>
                  <select
                    value={apiKeyPlatform}
                    onChange={(e) => setApiKeyPlatform(e.target.value)}
                    className="input-field"
                  >
                    {platformOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-1 block">
                    API Key
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-1 block">
                    API Secret
                  </label>
                  <input
                    type="password"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    placeholder="Enter your API secret"
                    className="input-field"
                  />
                </div>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add API Key
                </Button>
              </form>

              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-[#08080f] rounded-lg border border-[#1a1a30]"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={key.platform === 'x' ? 'info' : 'default'}>
                        {key.platform === 'x' ? 'X' : 'LinkedIn'}
                      </Badge>
                      <div className="font-mono text-sm text-[#6e6e85] break-all">
                        <span>{key.maskedKey}</span>
                        <span className="text-[#4a4a60] mx-2 hidden sm:inline">|</span>
                        <span className="hidden sm:inline">{key.maskedSecret}</span>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteApiKey(key.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Connected Accounts */}
        <Section delay={400}>
          <Card className="bg-[#10101c] border-[#1a1a30]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#6e6e85]" />
                <CardTitle className="text-white">Connected Accounts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {connectedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-3 bg-[#08080f] rounded-lg border border-[#1a1a30]"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={account.platform === 'x' ? 'info' : 'default'}>
                        {account.platform === 'x' ? 'X' : 'LinkedIn'}
                      </Badge>
                      <span className="text-sm text-[#6e6e85]">{account.username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#7c6aef]" />
                      <span className="text-sm text-[#7c6aef]">Connected</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Preferences */}
        <Section delay={500}>
          <Card className="bg-[#10101c] border-[#1a1a30]">
            <CardHeader>
              <CardTitle className="text-white">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-1 block">
                  Default Brand Voice
                </label>
                <select
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  className="input-field"
                >
                  {brandVoiceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-1 block">
                  Default Detail Level
                </label>
                <select
                  value={detailLevel}
                  onChange={(e) => setDetailLevel(e.target.value)}
                  className="input-field"
                >
                  {detailLevelOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Danger Zone */}
        <Section delay={600}>
          <Card className="bg-[#10101c] border-red-900/50">
            <CardHeader>
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="h-5 w-5" />
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6e6e85] mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="danger">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </Section>
      </div>
    </div>
  );
}
