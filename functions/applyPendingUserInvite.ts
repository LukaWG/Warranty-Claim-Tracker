import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const payload = await req.json();
  const { event, data } = payload;

  if (event?.type !== 'create') {
    return Response.json({ message: 'Not a create event, skipping.' });
  }

  const userEmail = data?.email;
  if (!userEmail) {
    return Response.json({ message: 'No email found on user record, skipping.' });
  }

  // Find matching pending invite
  const pendingInvites = await base44.asServiceRole.entities.PendingUserInvite.filter({ email: userEmail });

  if (!pendingInvites || pendingInvites.length === 0) {
    return Response.json({ message: 'No pending invite found for this user.' });
  }

  const invite = pendingInvites[0];

  // Apply invite data to the user record
  const updateData = {};
  if (invite.custom_role) updateData.custom_role = invite.custom_role;
  if (invite.first_name) updateData.first_name = invite.first_name;
  if (invite.last_name) updateData.last_name = invite.last_name;
  if (invite.default_site) updateData.default_site = invite.default_site;

  await base44.asServiceRole.entities.User.update(data.id, updateData);

  // Clean up the pending invite
  await base44.asServiceRole.entities.PendingUserInvite.delete(invite.id);

  return Response.json({ message: 'Pending user invite applied successfully.', updateData });
});