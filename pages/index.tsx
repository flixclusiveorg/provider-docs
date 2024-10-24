import {
    Button,
    Card,
    CardGrid,
    GuiderLayout,
    Hero,
} from '@neato/guider/client';

export default function LandingPage() {
    const features = [
        {
            title: "Personalized Content",
            description: "Add or remove providers like puzzle pieces to personalize your streaming experience. Choose exactly where your content comes from.",
            icon: 'mdi:puzzle-outline'
        },
        {
            title: "Community-Driven Updates",
            description: "Benefit from a growing ecosystem of providers that are regularly updated by the community, ensuring fresh content sources.",
            icon: 'fluent:people-community-12-regular'
        },
        {
            title: "Lightweight",
            description: "Providers are lightweight scripts that don't bloat your app. Add as many as you want without impacting performance.",
            icon: 'lucide:feather'
        },
    ];

    return (
        <GuiderLayout meta={{ layout: 'page' }}>
            <Hero>
                <Hero.Title>Providers – Customize your media preferences</Hero.Title>
                <Hero.Subtitle>
                    Build media extensions to customize and enhance your Flixclusive experience.
                </Hero.Subtitle>
                <Hero.Actions>
                    <Button to="/guides">Get started</Button>
                    <Button to="/api-ref" type="secondary">
                        Explore API
                    </Button>
                </Hero.Actions>
            </Hero>
            <CardGrid>
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                    >
                        {feature.description}
                    </Card>
                ))}
            </CardGrid>
        </GuiderLayout>
    );
}
