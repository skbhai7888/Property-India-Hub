path = "app/admin/SiteVisitsPanel.tsx"
with open(path, "r") as f:
    lines = f.readlines()

# Step 1: find and remove the wrongly inserted block (inside matchesFilter)
start_idx = None
for i, line in enumerate(lines):
    if line.strip() == "{v.poster_name ? (":
        start_idx = i
        break

if start_idx is None:
    print("FAILED - could not find misplaced block start")
else:
    end_idx = None
    for j in range(start_idx, min(start_idx + 10, len(lines))):
        if lines[j].strip() == ")}":
            end_idx = j
            break
    if end_idx is None:
        print("FAILED - could not find misplaced block end")
    else:
        block_lines = lines[start_idx:end_idx+1]
        del lines[start_idx:end_idx+1]

        # Step 2: find the correct JSX line (contains preferred_date AND c9a84c)
        target_idx = None
        for i, line in enumerate(lines):
            if "preferred_date" in line and "c9a84c" in line:
                target_idx = i
                break

        if target_idx is None:
            print("FAILED - could not find correct JSX target line")
        else:
            indent = lines[target_idx][:len(lines[target_idx]) - len(lines[target_idx].lstrip())]
            # re-indent block_lines to match target line's indent
            reindented = []
            for bl in block_lines:
                stripped = bl.lstrip()
                reindented.append(indent + stripped)
            lines[target_idx:target_idx] = reindented

            with open(path, "w") as f:
                f.writelines(lines)
            print("SUCCESS - moved poster block to correct JSX location")
