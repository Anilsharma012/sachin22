import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import AdminLayout from '@/components/layout/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { X, Plus, ImagePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageInput, ImageGallery } from '@/components/AdminImageUpload';

interface ContentData {
  hero?: { title: string; subtitle: string; ctas: any[]; background_image?: string };
  about?: { summary: string; highlights: string[]; background_image?: string };
  skills?: { frontend: string[]; backend: string[]; devops: string[]; background_image?: string };
  contact?: { email: string; phone: string; address: string; whatsapp_number: string };
  social?: { [key: string]: string };
  banners?: { items: any[] };
  backgrounds?: { hero?: string; about?: string; skills?: string; projects?: string };
}

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<ContentData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    try {
      const keys = ['hero', 'about', 'skills', 'contact', 'social', 'banners'];
      const results = await Promise.all(
        keys.map((key) =>
          api.get(`/api/content/${key}`).then((data) => ({ [key]: data }))
        )
      );
      const merged = Object.assign({}, ...results);
      setContent(merged);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (key: string) => {
    setSaving(key);
    try {
      await api.put(`/api/admin/content/${key}`, content[key as keyof ContentData]);
      toast({
        title: 'Success',
        description: `${key} updated successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to update ${key}`,
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground mt-2">Edit your portfolio content sections</p>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="banners">Banners</TabsTrigger>
            <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Main landing section content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={content.hero?.title || ''}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, title: e.target.value } as any,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Subtitle</label>
                  <Input
                    value={content.hero?.subtitle || ''}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, subtitle: e.target.value } as any,
                      }))
                    }
                  />
                </div>
                <Button onClick={() => saveContent('hero')} disabled={saving === 'hero'}>
                  {saving === 'hero' ? 'Saving...' : 'Save'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Your professional summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Summary</label>
                  <Textarea
                    value={content.about?.summary || ''}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        about: { ...prev.about, summary: e.target.value } as any,
                      }))
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Highlights</label>
                  {(content.about?.highlights || []).map((highlight, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <Input
                        value={highlight}
                        onChange={(e) => {
                          const newHighlights = [...(content.about?.highlights || [])];
                          newHighlights[idx] = e.target.value;
                          setContent((prev) => ({
                            ...prev,
                            about: { ...prev.about, highlights: newHighlights } as any,
                          }));
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newHighlights = (content.about?.highlights || []).filter(
                            (_, i) => i !== idx
                          );
                          setContent((prev) => ({
                            ...prev,
                            about: { ...prev.about, highlights: newHighlights } as any,
                          }));
                        }}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContent((prev) => ({
                        ...prev,
                        about: { ...prev.about, highlights: [...(prev.about?.highlights || []), ''] } as any,
                      }));
                    }}
                  >
                    <Plus size={16} className="mr-1" /> Add Highlight
                  </Button>
                </div>
                <Button onClick={() => saveContent('about')} disabled={saving === 'about'}>
                  {saving === 'about' ? 'Saving...' : 'Save'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Section</CardTitle>
                <CardDescription>Organize your skills by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {['frontend', 'backend', 'devops'].map((category) => (
                  <div key={category}>
                    <h3 className="font-medium capitalize mb-3">{category}</h3>
                    {(content.skills?.[category as keyof typeof content.skills] || []).map(
                      (skill, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <Input
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [
                                ...(content.skills?.[category as keyof typeof content.skills] || []),
                              ];
                              newSkills[idx] = e.target.value;
                              setContent((prev) => ({
                                ...prev,
                                skills: {
                                  ...prev.skills,
                                  [category]: newSkills,
                                } as any,
                              }));
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newSkills = (
                                content.skills?.[category as keyof typeof content.skills] || []
                              ).filter((_, i) => i !== idx);
                              setContent((prev) => ({
                                ...prev,
                                skills: {
                                  ...prev.skills,
                                  [category]: newSkills,
                                } as any,
                              }));
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      )
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setContent((prev) => ({
                          ...prev,
                          skills: {
                            ...prev.skills,
                            [category]: [
                              ...(prev.skills?.[category as keyof typeof prev.skills] || []),
                              '',
                            ],
                          } as any,
                        }));
                      }}
                    >
                      <Plus size={16} className="mr-1" /> Add Skill
                    </Button>
                  </div>
                ))}
                <Button onClick={() => saveContent('skills')} disabled={saving === 'skills'}>
                  {saving === 'skills' ? 'Saving...' : 'Save'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Your contact details displayed on the site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={content.contact?.email || ''}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value } as any,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={content.contact?.phone || ''}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, phone: e.target.value } as any,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    value={content.contact?.address || ''}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, address: e.target.value } as any,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">WhatsApp Number</label>
                  <Input
                    value={content.contact?.whatsapp_number || ''}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, whatsapp_number: e.target.value } as any,
                      }))
                    }
                  />
                </div>
                <Button onClick={() => saveContent('contact')} disabled={saving === 'contact'}>
                  {saving === 'contact' ? 'Saving...' : 'Save'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['github', 'linkedin', 'twitter', 'instagram', 'facebook', 'youtube'].map(
                  (social) => (
                    <div key={social}>
                      <label className="text-sm font-medium capitalize">{social}</label>
                      <Input
                        type="url"
                        value={content.social?.[social] || ''}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            social: { ...prev.social, [social]: e.target.value } as any,
                          }))
                        }
                      />
                    </div>
                  )
                )}
                <Button onClick={() => saveContent('social')} disabled={saving === 'social'}>
                  {saving === 'social' ? 'Saving...' : 'Save'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banners" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Banner Carousel</CardTitle>
                <CardDescription>Manage carousel banners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(content.banners?.items || []).map((banner, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Image URL</label>
                        <Input
                          type="url"
                          value={banner.image_url || ''}
                          onChange={(e) => {
                            const newBanners = [...(content.banners?.items || [])];
                            newBanners[idx] = { ...banner, image_url: e.target.value };
                            setContent((prev) => ({
                              ...prev,
                              banners: { ...prev.banners, items: newBanners } as any,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Alt Text</label>
                        <Input
                          value={banner.alt || ''}
                          onChange={(e) => {
                            const newBanners = [...(content.banners?.items || [])];
                            newBanners[idx] = { ...banner, alt: e.target.value };
                            setContent((prev) => ({
                              ...prev,
                              banners: { ...prev.banners, items: newBanners } as any,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Link URL</label>
                        <Input
                          type="url"
                          value={banner.link_url || ''}
                          onChange={(e) => {
                            const newBanners = [...(content.banners?.items || [])];
                            newBanners[idx] = { ...banner, link_url: e.target.value };
                            setContent((prev) => ({
                              ...prev,
                              banners: { ...prev.banners, items: newBanners } as any,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Order</label>
                        <Input
                          type="number"
                          value={banner.order || idx + 1}
                          onChange={(e) => {
                            const newBanners = [...(content.banners?.items || [])];
                            newBanners[idx] = { ...banner, order: parseInt(e.target.value) };
                            setContent((prev) => ({
                              ...prev,
                              banners: { ...prev.banners, items: newBanners } as any,
                            }));
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newBanners = (content.banners?.items || []).filter(
                            (_, i) => i !== idx
                          );
                          setContent((prev) => ({
                            ...prev,
                            banners: { ...prev.banners, items: newBanners } as any,
                          }));
                        }}
                      >
                        <X size={16} className="mr-1" /> Remove
                      </Button>
                    </div>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setContent((prev) => ({
                      ...prev,
                      banners: {
                        ...prev.banners,
                        items: [
                          ...(prev.banners?.items || []),
                          { image_url: '', alt: '', link_url: '', order: (prev.banners?.items || []).length + 1 },
                        ],
                      } as any,
                    }));
                  }}
                >
                  <Plus size={16} className="mr-1" /> Add Banner
                </Button>
                <Button onClick={() => saveContent('banners')} disabled={saving === 'banners'}>
                  {saving === 'banners' ? 'Saving...' : 'Save'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
