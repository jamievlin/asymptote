#!/usr/bin/env python3
#####
# keywords.py
# Translated from keywords.pl
#
#  Extract keywords from camp.l and list them in a keywords file. These
#  keywords are used in autocompletion at the interactive prompt.
#####

import argparse
import re
import textwrap
from typing import List

parser = argparse.ArgumentParser()
parser.add_argument("--camplfile", required=True)
parser.add_argument("--output", required=True)
parser.add_argument("--process-file", required=True)
args = parser.parse_args()

camplfile = args.camplfile
output_keywords_file = args.output
process_file = args.process_file

# Extra keywords to add that aren't automatically extracted, currently none.
extrawords: List[str] = []

with open(output_keywords_file, "w", encoding="utf-8") as keywords:

    keywords.write(
        textwrap.dedent(
            """\
            /*****
             * This file is automatically generated by keywords.py.
             * Changes will be overwritten.
             *****/

            """
        )
    )

    def add(word):  # pylint: disable=redefined-outer-name
        keywords.write(f"ADD({word});\n")

    for word in extrawords:
        add(word)

    with open(camplfile, encoding="utf-8") as camp:
        # Search for the %% separator, after which the definitions start.
        for line in camp:
            if re.search(r"^%%\s*$", line):
                break

        # Grab simple keyword definitions from camp.l
        for line in camp:
            if re.search(r"^%%\s*$", line):
                break  # A second %% indicates the end of definitions.
            match = re.search(r"^([A-Za-z_][A-Za-z0-9_]*)\s*\{", line)
            if match:
                add(match.group(1))

    # Grab the special commands from the interactive prompt.
    with open(process_file, encoding="utf-8") as process:
        for line in process:
            match = re.search(
                r"^\s*ADDCOMMAND\(\s*([A-Za-z_][A-Za-z0-9_]*),",
                line,
            )
            if match:
                add(match.group(1))
