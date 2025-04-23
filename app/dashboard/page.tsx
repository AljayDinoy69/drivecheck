import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/subcom/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/subcom/card";
import EntryForm from "@/components/EntryForm";
import EntriesList from "@/components/EntriesList";
import Reports from "@/components/Reports";

export default function Dashboard() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Drive Check System</h1>
      
      <Tabs defaultValue="entry" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="entry">New Entry</TabsTrigger>
          <TabsTrigger value="list">Current Entries</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="entry">
          <Card>
            <CardHeader>
              <CardTitle>New Vehicle Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <EntryForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Current Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <EntriesList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Reports />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}