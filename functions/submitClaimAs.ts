import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only Service Managers can submit claims as other users
    const userRole = user.custom_role || user.role;
    if (userRole !== 'Service Manager') {
      return Response.json({ error: 'Forbidden: Only Service Managers can submit claims as other users' }, { status: 403 });
    }

    const body = await req.json();
    const { claimData, submittingAs } = body;

    // Create the claim with submitted_for field to track who it's for
    const claim = await base44.asServiceRole.entities.WarrantyClaim.create({
      ...claimData,
      submitted_for: submittingAs
    });

    return Response.json({ success: true, claim });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});